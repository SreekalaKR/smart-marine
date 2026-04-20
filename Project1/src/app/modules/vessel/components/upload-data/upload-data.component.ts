import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VslVesselService } from 'src/app/services/tables/vsl_vessel/vsl-vessel.service';


import * as Papa from 'papaparse';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private vslVesselService: VslVesselService) { }

  selectedFile: File | null = null;
  csvData: any[] = [];
  tableHeaders: any[] = [];
  tableData: any[] = [];

  ngOnInit(): void { }

  setFile(data: any) {

    const parsedData = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
    });

    this.csvData = parsedData.data;
    this.tableHeaders = parsedData.meta.fields ?? [];

  }


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      console.log('Uploading file.....', this.selectedFile.name);


      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile);

      fileReader.onload = (event) => {
        const fileData = fileReader.result;
        this.setFile(fileData);
      };

    }
  }







  submitData() {
    if (this.selectedFile) {

      this.vslVesselService.uploadCsv(this.selectedFile).subscribe(
        (response: any) => {
          console.log('File uploaded successfully', response);
          //alert('Data submitted');
          Swal.fire("Data submitted successfully", "success");
          this.router.navigateByUrl('vessel/vessel-list');


        },
        (error) => {
          console.error('Failed to upload file!!!!', error);

        }
      );

      this.selectedFile = null;
    }
  }





  resetUpload(): void {
    window.location.reload();
  }


  reDirect() {
    this.router.navigateByUrl('vessel/vessel-list');
  }
}
