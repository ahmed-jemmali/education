import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAllCountries().subscribe(
      (data) => {
        console.log('countries data', data.countries);
        this.countries = data.countries;
      }
    )
  }

}
