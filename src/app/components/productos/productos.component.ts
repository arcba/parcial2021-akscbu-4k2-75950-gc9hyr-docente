import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel } from '../../models/producto';
import { ProductosService } from '../../services/mock-productos.service';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  Lista: ProductoModel[] = [];
  FormReg: FormGroup;
  mostrar: boolean = false;
  submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private productosService: ProductosService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.mostrarTabla();
    this.createForm();
  }

  mostrarTabla() {
    this.productosService.get().subscribe((res: any) => {
      this.Lista = res;
    });
  }
  Agregar() {
    this.mostrar = true;
    this.submitted = false;
  }

  createForm() {
    this.FormReg = this.formBuilder.group({
      ProductoID: [0],
      ProductoNombre: ['', [Validators.required]],
      ProductoStock: [0, [Validators.required]],
      ProductoFechaAlta: [null, [Validators.required]]
    });
  }
  Grabar() {
    this.submitted = true;
    if (this.FormReg.invalid) {
      return;
    }
    const formValue = this.FormReg.value;
    if (formValue.ProductoID == 0 || formValue.ProductoID == null) {
      formValue.ProductoID = 0;
      this.productosService.post(formValue).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.mostrarTabla();
      });
    }
  }
  Volver() {
    this.mostrar = false;
  }

}