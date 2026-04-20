
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()//This decorator marks the class vsl_vessel as an entity, indicating that it represents a database table

export class vsl_vessel {

  @PrimaryColumn({ type: 'text', name: 'vessel_no' })//This decorator is used to mark the vesselNo property as the primary column of the entity. It specifies that the column is of type text and has the name vessel_no.

  vesselNo: string;//property declaration for the vesselNo property. It specifies that the property is of type string.

  @Column({ type: 'text', name: 'company_code', nullable: true })

  companyCode: string | null;

  @Column({ type: 'text', name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column({ type: 'timestamp', name: 'created_time', nullable: true })
  createdTime: Date | null;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'dwt', nullable: true })/*precision: total number of digits. scale: number of digits after the decimal point.*/
  dwt: number | null;


  @Column({ type: 'text', name: 'fleet_group_code', nullable: true })
  fleetGroupCode: string | null;

  @Column({ type: 'text', name: 'fleet_profile_code', nullable: true })
  fleetProfileCode: string | null;

  @Column({ type: 'boolean', name: 'is_active', nullable: true })
  isActive: boolean | null;

  @Column({ type: 'boolean', name: 'is_eeoi_only', nullable: true })
  isEeoiOnly: boolean | null;

  @Column({ type: 'boolean', name: 'is_internal_only', nullable: true })
  isInternalOnly: boolean | null;

  @Column({ type: 'boolean', name: 'is_new_vessel', nullable: true })
  isNewVessel: boolean | null;

  @Column({ type: 'boolean', name: 'is_perf_vsl', nullable: true })
  isPerfVsl: boolean | null;

  @Column({ type: 'boolean', name: 'is_tc_relet', nullable: true })
  isTcRelet: boolean | null;

  @Column({ type: 'text', name: 'marine_ship_type' })
  marineShipType: string;

  @Column({ type: 'text', name: 'master_email' })
  masterEmail: string;

  @Column({ type: 'text', name: 'modified_by', nullable: true })
  modifiedBy: string | null;

  @Column({ type: 'timestamp', name: 'modified_time', nullable: true })
  modifiedTime: Date | null;

  @Column({ type: 'text', name: 'operator_bu_email', nullable: true })
  operatorBuEmail: string | null;

  @Column({ type: 'text', name: 'operator_email', nullable: true })
  operatorEmail: string | null;

  @Column({ type: 'text', name: 'operator_name', nullable: true })
  operatorName: string | null;

  @Column({ type: 'text', name: 'owner_company', nullable: true })
  ownerCompany: string | null;

  @Column({ type: 'text', name: 'owner_contact_details', nullable: true })
  ownerContactDetails: string | null;

  @Column({ type: 'text', name: 'ownership_status' })
  ownershipStatus: string;

  @Column({ type: 'text', name: 'pic', nullable: true })
  pic: string | null;

  @Column({ type: 'text', name: 'sister_vessels', nullable: true })
  sisterVessels: string | null;

  @Column({ type: 'text', name: 'vessel_class' })
  vesselClass: string;

  @Column({ type: 'text', name: 'vessel_flag' })
  vesselFlag: string;

  @Column({ type: 'text', name: 'vessel_name' })
  vesselName: string;

  @Column({ type: 'text', name: 'vessel_type' })
  vesselType: string;

  @Column({ type: 'text', name: 'vm_html_url', nullable: true })
  vmHtmlUrl: string | null;
}
