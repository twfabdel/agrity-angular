export class User {
  grower_id: number;
  first_name: string;
  last_name: string;
  email: string; 
  phone: string;

  encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'first_name': this.first_name.toString(),
      'last_name': this.last_name.toString(),
      'email_addresses': [this.email.toString()],
      'phone_numbers': [this.phone.toString()],
    });
  }


}
