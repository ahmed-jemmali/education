import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  courses: any;
  constructor(private courseService : CourseService,
    private router : Router) { }

  ngOnInit() {
    this.getAllCourses();
  }
  getAllCourses(){
    this.courseService.getAllCourses().subscribe(
      (data)=>{
        console.log('this is my course :',data.coursesBE);
        this.courses=data.coursesBE;
      }
    )
  };

  deleteCourse(id:any){
    this.courseService.deleteCourse(id).subscribe(
      (data)=>{
        console.log('information :',data.message);
        this.getAllCourses();
        
      }
    )
  };
  
  goToEdit(id:any){
    this.router.navigate([`edit-course/${id}`])
  }

}
