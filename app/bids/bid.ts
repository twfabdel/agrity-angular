export class Bid {
  bid_id: number;
  almondVariety: String;
  almondPounds: String;
  pricePerPound: String;
  paymentDate: String;
  comment: String;

  managementType: String;
  managementTypeDelay: number;

  growerIds: number[];

  acceptedGrowers: [number];
  rejectedGrowers: [number];
  callRequestedGrowers: [number];
  noResponseGrowers: [number];

  currentlyOpen: boolean;


  encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'grower_ids': this.growerIds,
      'almond_variety': this.almondVariety.toString(),
      'almond_pounds': this.almondPounds.toString(),
      'price_per_pound': this.pricePerPound.toString(),
      'management_type': {
        'type': this.managementType.toString(),
        'delay': this.managementTypeDelay.toString()
      },
      'payment_date': this.paymentDate.toString(),
      'comment': this.comment.toString(),
    });
  }

  //static decode(userJson: Object): User {
  //  var user  = new User();
  //  user.grower_id = userJson['id'];
  //  user.first_name = userJson['firstName'];
  //  user.last_name = userJson['lastName'];

  //  if (userJson['emailAddressStrings'] != null) {
  //    user.email = userJson['emailAddressStrings'][0];
  //  } else {
  //    user.phone = null;
  //  }

  //  if (userJson['phoneNumbers'] != null) {
  //    user.phone = userJson['phoneNumbers'][0];
  //  } else {
  //    user.phone = null;
  //  }

  //  return user;
  //}
}
