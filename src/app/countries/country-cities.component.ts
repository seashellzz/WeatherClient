import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from './City';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-country-cities',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './country-cities.component.html',
  styleUrl: './country-cities.component.css'
})
export class CountryCitiesComponent {
  public cities: City[] = [];
  public displayedColumns : string[] = ["cityId", "name", "latitude", "longitude"];
  id: number;
  //public baseUrl:string = "http://localhost:5291/";

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = -1;
  }
                             
  ngOnInit() :void{
    this.getCities();
  }

  getCities() {
    let idparameter = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idparameter ? +idparameter : -1;
    this.http.get<City[]>(`${environment.baseUrl}` + `api/countries/countryCities/${this.id}`).subscribe(
       {
        next: result => this.cities = result,
        error: error => console.error(error)
      }
      
    );
  }
  title = "CityClient";
}
