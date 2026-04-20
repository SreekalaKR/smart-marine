import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VslVesselService } from 'src/app/services/tables/vsl_vessel/vsl-vessel.service';

import { Observable, Observer } from 'rxjs';
import * as Papa from 'papaparse';
import Swal from 'sweetalert2';

import { ActivatedRoute } from '@angular/router';


//import { NgConfirmService } from 'ng-confirm-box';

interface Vessel {
  vesselName: string;
  imoNumber: string;
  flag: string;
  vesselType: string;
  vesselClass: string;
  vesselEmail: string;
  eeoiCheckbox: boolean;
}


@Component({
  selector: 'app-vessel-list',
  templateUrl: './vessel-list.component.html',
  styleUrls: ['./vessel-list.component.css']
})

export class VesselListComponent implements OnInit {
  showEditLabel: any;
  showDeleteLabel: any;

  //for displaying icon names
  showEditMessage: boolean = false;
  showDeleteMessage: boolean = false;
  /////////////////

  //selectedCompany: string = "";

  currentPage: number = 1; // Current page number
  itemsPerPage: number = 6; // Number of items to display per page

  ///////////////////

  // Define separate filter properties for each column
  filterByVesselName: string = '';
  filterByIMO: string = '';
  filterByFlag: string = '';
  filterByVesselType: string = '';
  filterByVesselClass: string = '';
  filterByVesselEmail: string = '';

  filterByOwnershipStatus: string = '';
  filterByMarineShipType: string = '';

  // Define a variable to keep track of the currently sorted column
  sortOrder: string = 'asc'; // 'asc' or 'desc'
  sortColumn: string = '';

  // Add a variable to store the selected company code
  selectedCompanyCode: string = "All";
  // Add variables to control button states
  isCreateButtonEnabled: boolean = true;
  isDownloadButtonEnabled: boolean = true;
  isUploadButtonEnabled: boolean = true;

  constructor(private router: Router, private vslVesselService: VslVesselService, private route: ActivatedRoute) { }


  vesselList: any[] = [];// Assuming the data from the server will be an array of objects



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCompanyCode = params['companyCode'] || 'All'; // Set a default value if the query parameter is not present
    });
    this.fetchVesselData();
  }



  fetchVesselData() {
    this.vslVesselService.getAllVessels().subscribe({
      next: (response: any) => {
        console.log('Data fetched from  backend successfully:', response);
        const vesselData = Array.isArray(response) ? response : [response];
        if (this.selectedCompanyCode === 'All') {
          // Display all vessels when "All" is selected as the company code
          this.vesselList = vesselData.map((item: any) => ({
            vesselName: item.vesselName,
            vesselNo: item.vesselNo,
            vesselFlag: item.vesselFlag,
            vesselType: item.vesselType,
            vesselClass: item.vesselClass,
            masterEmail: item.masterEmail,
            isEeoiOnly: item.isEeoiOnly,
            ownershipStatus: item.ownershipStatus,
            marineShipType: item.marineShipType
          }));
        } else {
          // Filter data based on the selected company code
          this.vesselList = vesselData
            .filter((item: any) => item.companyCode === this.selectedCompanyCode)
            .map((item: any) => ({
              vesselName: item.vesselName,
              vesselNo: item.vesselNo,
              vesselFlag: item.vesselFlag,
              vesselType: item.vesselType,
              vesselClass: item.vesselClass,
              masterEmail: item.masterEmail,
              isEeoiOnly: item.isEeoiOnly,
              ownershipStatus: item.ownershipStatus,
              marineShipType: item.marineShipType
            }));
        }


        // Recalculate totalPages based on updated vesselList
        this.totalPages = Math.ceil(this.vesselList.length / this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Failed to fetch vessel details:', error);
      }
    });
  }


  editVessel(vessel: any) {

    this.router.navigate(['vessel/vessel-creation', vessel.vesselNo]);

  }

  Delete(vesselNo: string) {
    Swal.fire({
      title: 'Are you want to remove this vessel data?',
      text: 'You will not be able to recover this vessel data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        // Call the deleteVessel method from the service
        this.vslVesselService.deleteVessel(vesselNo).subscribe(
          () => {

            this.vesselList = this.vesselList.filter((vessel) => vessel.vesselNo !== vesselNo);
            //alert('Data deleted successfully');

          },
          (error: any) => {
            console.error('Error deleting data:', error);
          }
        );
        Swal.fire("Deleted", "Your data has been deleted", "success");
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("canceled", "Your data is safe", "error");

      }
    }
    );

  }



  vesselCreation() {
    if (this.selectedCompanyCode !== "All") {
      // this.router.navigate(['vessel/vessel-creation', { companyCode: this.selectedCompanyCode }]);
      this.router.navigate(['vessel/vessel-creation'], { queryParams: { companyCode: this.selectedCompanyCode } });
    } else {

      this.router.navigateByUrl('vessel/vessel-creation');
    }
  }



  downloadCsv() {
    const csvData = Papa.unparse(this.vesselList);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'vessel_data.csv';
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  }

  gotoUploadPage() {
    this.router.navigateByUrl('vessel/upload-data');
  }

  //adding next prevoius buttons logic 

  // Calculate the total number of pages based on itemsPerPage
  totalPages: number = Math.ceil(this.vesselList.length / this.itemsPerPage);

  // Method to update the current page
  updateCurrentPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Add this method to your component
  getPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.vesselList.filter(this.applyVesselNameFilter)
      .filter(this.applyIMOFilter)
      .filter(this.applyFlagFilter)
      .filter(this.applyVesselTypeFilter)
      .filter(this.applyVesselClassFilter)
      .filter(this.applyVesselEmailFilter)
      .filter(this.applyOwnershipStatusFilter)
      .filter(this.applyMarineShipTypeFilter)
      .slice(startIndex, endIndex);
  }






  // Create a custom filter function for each column
  applyVesselNameFilter = (vessel: any) => {
    return this.filterByVesselName === '' || vessel.vesselName.toLowerCase().includes(this.filterByVesselName.toLowerCase());
  };

  applyIMOFilter = (vessel: any) => {
    return this.filterByIMO === '' || vessel.vesselNo.toLowerCase().includes(this.filterByIMO.toLowerCase());
  };

  applyFlagFilter = (vessel: any) => {
    return this.filterByFlag === '' || vessel.vesselFlag.toLowerCase().includes(this.filterByFlag.toLowerCase());
  };

  applyVesselTypeFilter = (vessel: any) => {
    return this.filterByVesselType === '' || vessel.vesselType.toLowerCase().includes(this.filterByVesselType.toLowerCase());
  };

  applyVesselClassFilter = (vessel: any) => {
    return this.filterByVesselClass === '' || vessel.vesselClass.toLowerCase().includes(this.filterByVesselClass.toLowerCase());
  };

  applyVesselEmailFilter = (vessel: any) => {
    return this.filterByVesselEmail === '' || vessel.masterEmail.toLowerCase().includes(this.filterByVesselEmail.toLowerCase());
  };

  applyOwnershipStatusFilter = (vessel: any) => {
    return this.filterByOwnershipStatus === '' || vessel.ownershipStatus.toLowerCase().includes(this.filterByOwnershipStatus.toLowerCase());
  };

  applyMarineShipTypeFilter = (vessel: any) => {
    return this.filterByMarineShipType === '' || vessel.marineShipType.toLowerCase().includes(this.filterByMarineShipType.toLowerCase());
  };



  sortBy(column: string) {
    if (this.sortColumn === column) {
      // Toggle sort order if the same column is clicked
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column for sorting
      this.sortColumn = column;
      this.sortOrder = 'asc'; // Default to ascending order for the new column
    }

    // Call a function to reapply sorting to your data
    this.applySorting();
  }

  applySorting() {
    // Sort your data here based on this.sortColumn and this.sortOrder
    // For example, if you're using an array of objects:
    this.vesselList.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (this.sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }


  onCompanyChange() { this.fetchVesselData(); }

}











