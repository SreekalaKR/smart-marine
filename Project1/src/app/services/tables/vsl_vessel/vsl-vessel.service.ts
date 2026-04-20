import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VslVesselService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/vsl_vessel';


  createVessel(vesselData: any) {

    return this.http.post(this.apiUrl, vesselData);// Send the POST request with the data
  }


  getAllVessels() {

    return this.http.get(this.apiUrl);//return this.http.get(`${this.apiUrl}/ABC124`);

  }

  updateVessel(vesselNo: string, updateData: any) {
    return this.http.put(`${this.apiUrl}/${vesselNo}`, updateData);
  }

  findVesselByNo(vesselNo: string) {
    return this.http.get(`${this.apiUrl}/${vesselNo}`);
  }


  deleteVessel(vesselNo: string) {
    return this.http.delete<void>(`${this.apiUrl}/${vesselNo}`);
  }



  uploadCsv(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  checkVesselNoAvailability(vesselNo: string, companyCode: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-availability/${vesselNo}/${companyCode}`);
  }




  login(credentials: { Username: string; Password: string }) {
    return this.http.post('http://localhost:3000/users/login', credentials);
  }

}
