import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseURL: string = "http://localhost:3000/api/courses";
  constructor(private httpClient: HttpClient) { }

  addCourse(course: any,image:File) {
    let formData = new FormData();
    formData.append('name', course.name);
    formData.append('description', course.description);
    formData.append('trainerName', course.trainerName);
    formData.append('price', course.price);
    formData.append('startAt', course.startAt);
    formData.append('capacity', course.capacity);
    formData.append('image', image);
    return this.httpClient.post(`${this.courseURL}/addCourse`, formData);
  }

  editCourse(course: any) {
    return this.httpClient.put<{message:any}>(`${this.courseURL}/editCourse/${course._id}`, course);
  }

  getAllCourses() {
    return this.httpClient.get<{coursesBE :any}>(`${this.courseURL}/allCourses`);
  }

  getCourseById(id: any) {
    return this.httpClient.get<{course :any}>(`${this.courseURL}/getCourse/${id}`);
  }

  getCourseByName(name: any){
    return this.httpClient.post(`${this.courseURL}/search`,name);
  }

  deleteCourse(id:any){
    return this.httpClient.delete<{message:any}>(`${this.courseURL}/deleteCourse/${id}`);
  }

  getAllCountries(){
    return this.httpClient.get<{countries:any}>(`${this.courseURL}/countries`);
  }
}
