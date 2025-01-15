
import { Component, inject } from '@angular/core';
import { JugueteService } from '../../services/juguete.service';
import { ApiResponseJuguetes, Juguete } from '../../common/interface';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { CurrencyPipe } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-juguete-list',
  imports: [NgbPagination, CurrencyPipe, FaIconComponent],
  templateUrl: './juguete-list.component.html',
  styleUrl: './juguete-list.component.css'
})
export class JugueteListComponent {

  private readonly jugueteSvc: JugueteService = inject(JugueteService)
  apiData!: ApiResponseJuguetes;
  juguetes: Juguete[] = [];
  currentPage: number = 1;
  protected readonly faTrashCan = faTrashCan;

  constructor() {
    this.loadJuguetes();
  }

  protected loadJuguetes() {
    this.jugueteSvc.getJuguetesPaged(this.currentPage).subscribe(
      {
        next: value => {
          this.apiData = value;
          this.juguetes = value.juguetes.juguetes;
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


  deleteJuguete(juguete: Juguete) {
    if (confirm('Desea borrar ' + juguete.nombre + '?')) {
      this.jugueteSvc.deleteJuguete(juguete._id).subscribe(
        {
          next: value => {
            console.log(value);
            alert(value.message);
          },
          error: err => {
            console.error(err);
          }
        }
      )
    }
  }
}
