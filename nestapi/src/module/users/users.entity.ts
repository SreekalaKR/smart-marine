
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()//This decorator marks the class vsl_vessel as an entity, indicating that it represents a database table

export class users {

    @PrimaryColumn({ type: 'text', name: 'Username' })//This decorator is used to mark the vesselNo property as the primary column of the entity. It specifies that the column is of type text and has the name vessel_no.

    Username: string;//property declaration for the  Username property. It specifies that the property is of type string.

    @Column({ type: 'text', name: 'Password' })

    Password: string;

}
