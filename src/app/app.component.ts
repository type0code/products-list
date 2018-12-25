import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { HttpService } from './services/http/http.service';
import { IOption } from './ui/interfaces/option';
import { IIncludeProduct, IProduct } from './interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tableData: IProduct[];
  productForm: FormGroup;
  types: IOption[];
  customerTypes: IOption[];
  disabledМalidValue: boolean;
  allowRecharge: boolean;
  listProducts: IProduct[];
  includes: IIncludeProduct[];
  downloadJsonHref: SafeUrl;

  constructor(
    private httpSv: HttpService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {
    this.tableData = [];
    this.types = [
      {
        value: 'BASIC_SINGLE',
        label: 'BASIC_SINGLE'
      },
      {
        value: 'BASIC_VALID_HOURS',
        label: 'BASIC_VALID_HOURS'
      },
      {
        value: 'PASS_LIMITED',
        label: 'PASS_LIMITED'
      },
      {
        value: 'PASS_UNLIMITED',
        label: 'PASS_UNLIMITED'
      }
    ];
    this.customerTypes = [
      {
        value: 'ADULT',
        label: 'ADULT'
      },
      {
        value: 'CHILD',
        label: 'CHILD'
      }
    ];
    this.disabledМalidValue = false;
    this.allowRecharge = false;
    this.includes = [];
    this.listProducts = [];
  }

  ngOnInit() {
    this.getData('https://raw.githubusercontent.com/makedonmax/test_data/master/data.txt');

    this.initProductForm();
  }

  // get table data
  getData(url: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        console.log(data)
        this.tableData = this.listProducts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  // init form
  initProductForm() {
    this.productForm = this.formBuilder.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      customerType: ['', Validators.required],
      validValue: ['', Validators.required],
      price: ['', Validators.required],
      allowRecharge: [this.allowRecharge],
      rechargePrice: [{ value: this.allowRecharge ? '' : '0', disabled: !this.allowRecharge }, Validators.required],
      includes: [],
      vendor: '',
      id: ''
    });

    this.detectChangeValue();
  }

  // detect value's change
  detectChangeValue() {
    this.productForm.valueChanges.subscribe(changedData => {
      if (changedData.type === 'BASIC_SINGLE') {
        this.disabledМalidValue = true;
        this.productForm.controls.validValue.reset(
          { value: '0', disabled: this.disabledМalidValue },
          { emitEvent: false }
        );
      } else {
        this.disabledМalidValue = false;
        this.productForm.controls.validValue.enable({ emitEvent: false });
      }

      if (changedData.allowRecharge) {
        this.allowRecharge = true;
        this.productForm.controls.rechargePrice.enable({ emitEvent: false });
      } else {
        this.allowRecharge = false;
        this.productForm.controls.rechargePrice.reset(
          { value: '0', disabled: !this.allowRecharge },
          { emitEvent: false }
        );
      }
    });
  }

  // create new product
  createProduct(form: FormGroup) {
    if (form.valid) {
      let newProduct: IProduct = form.value;

      if (!newProduct.validValue) newProduct.validValue = 0;
      if (!newProduct.allowRecharge) newProduct.rechargePrice = 0;

      newProduct.includes = this.includes;
      newProduct.id = this.randomId();
      this.tableData.unshift(newProduct);

      let newTableData = JSON.parse(JSON.stringify(this.tableData));

      this.tableData = newTableData;

      this.createProductJSON(newProduct);
      this.productForm.reset();
      this.includes = [];
      this.listProducts = this.tableData;
    }
  }

  // get selected items from list
  getIncluded(data: { list: IProduct[], includes: IIncludeProduct[], type: string }) {
    this.listProducts = data.list;
    this.includes = data.includes;
  }

  // Random product id
  randomId(products: IProduct[] = this.tableData) {
    let id: number = Math.floor(Math.random() * 100000);

    products.forEach(task => {
      id === task.id ? id = this.randomId() : null;
    });

    return id;
  }

  // create & download JSON file
  createProductJSON(product: IProduct) {
    const JSON_FILE = JSON.stringify(product);
    const URI = this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8, ${encodeURIComponent(JSON_FILE)}`);

    this.downloadJsonHref = URI;
  }
}
