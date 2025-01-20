
import { Component, inject, Input, OnInit } from '@angular/core';
import { JugueteService } from '../../services/juguete.service';
import { Juguete } from '../../common/interface';
import { CurrencyPipe } from '@angular/common';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from '../../validators/FormValidators';


@Component({
  selector: 'app-juguete-edit',
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './juguete-edit.component.html',
  styleUrl: './juguete-edit.component.css'
})
export class JugueteEditComponent implements OnInit {
  @Input("id") id!: string;

  private readonly jugueteSvc: JugueteService = inject(JugueteService)
  private readonly router: Router = inject(Router);

  juguete!: Juguete;

  protected readonly faTrashCan = faTrashCan;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  formJuguete: FormGroup = this.formBuilder.group({
    _id: [''],
    nombre: ['', 
      [Validators.required, 
      Validators.minLength(2), 
      FormValidators.notOnlyWhiteSpace, 
      FormValidators.forbiddenNameValidator(/xxx || sex || marranadas/i)]],
    precio: [0, 
      [Validators.required, 
        Validators.min(2)]],
    categoria: ['', 
      [Validators.required, 
        Validators.minLength(2),  
        FormValidators.notOnlyWhiteSpace, 
        FormValidators.forbiddenNameValidator(/xxx/i)]],
    edadMinima: [0, 
      [Validators.required, 
        Validators.min(0), 
        Validators.max(18)]],
    imagen: ['', 
      [Validators.required, 
        Validators.minLength(2), 
        FormValidators.notOnlyWhiteSpace]]
  })
  
 /* GETTERS */
 editar: boolean = false;
 public loading: boolean = true;

 get nombre():any {
   return this.formJuguete.get('nombre');
 }

 get precio():any {
   return this.formJuguete.get('precio');
 }

 get categoria():any {
   return this.formJuguete.get('categoria');
 }

 get imagen():any {
   return this.formJuguete.get('imagen');
 }

 get edadMinima():any {
   return this.formJuguete.get('edadMinima');
 }


  ngOnInit(): void {
    if (this.id) {
        this.loadJuguete();
        this.editar = true;
        this.loading = false
    } else {
        this.formJuguete.reset();
        this.editar = false;
        this.loading = false
    }
  }

  onSubmit() {
    if (this.formJuguete.invalid) {
      this.formJuguete.markAllAsTouched();
      return;
    }
    if (this.editar) {
      this.jugueteSvc.updateJuguete(this.formJuguete.getRawValue()).subscribe({
        next: value => {
          alert(value.message);
          console.log('Updated -> list');
          this.router.navigateByUrl('juguete/list');
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
      this.jugueteSvc.addJuguete(this.formJuguete.getRawValue()).subscribe({
        next: value => {
          alert(value.message);
          console.log('Created -> list');
          this.router.navigateByUrl('juguete/list');
                },
        error: err => {
          console.error(err);
        }
      });
    }
  }


  protected loadJuguete() {
    this.jugueteSvc.getOneJuguete(this.id).subscribe(
      {
        next: value => {
          this.formJuguete.setValue(value);
        },
        complete: () => {
          console.log('Juguetes cargados!');
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }


}