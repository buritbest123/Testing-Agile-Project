async function getMemberPointsByPhoneNumber(db, tel) {
    if (!tel) {
      throw new Error("Valid phone number is required");
    }
  
    try {
      const member = await db.collection("member").findOne({ Tel: tel });
      if (!member) {
        throw new Error("Member not found");
      }
  
      return {
        MID: member.MID,
        Name: member.Mname,
        Phone: member.Tel,
        Points: member.Points,
        Alumni: member.Alumni, // Include if needed
      };
    } catch (err) {
      console.error("Error fetching member points by phone number:", err);
      throw err;
    }
  }
  
  async function addPointsToMember(db, MID, points) {
    if (MID === undefined || points === undefined || typeof points !== "number" || points <= 0) {
      throw new Error("Valid MID and a positive number of points are required");
    }
  
    try {
      const collection = db.collection("member");
  
      // Check if the member exists
      const member = await collection.findOne({ MID });
      if (!member) {
        throw new Error("Member not found");
      }
  
      // Increment points
      const result = await collection.updateOne(
        { MID },
        { $inc: { Points: points } }
      );
  
      if (result.modifiedCount === 1) {
        return await collection.findOne({ MID });
      } else {
        throw new Error("Failed to update points");
      }
    } catch (err) {
      console.error("Error adding points to member:", err);
      throw err;
    }
  }

  async function redeemPointsFromMember(db, MID, points) {
    if (MID === undefined || points === undefined || typeof points !== "number" || points <= 0) {
      throw new Error("Valid MID and a positive number of points are required");
    }
  
    try {
      const collection = db.collection("member");
  
      // Check if the member exists
      const member = await collection.findOne({ MID });
      if (!member) {
        throw new Error("Member not found");
      }
  
      // Check if the member has enough points
      if (member.Points < points) {
        throw new Error("Insufficient points for redemption");
      }
  
      // Deduct points
      const result = await collection.updateOne(
        { MID },
        { $inc: { Points: -points } }
      );
  
      if (result.modifiedCount === 1) {
        return await collection.findOne({ MID });
      } else {
        throw new Error("Failed to redeem points");
      }
    } catch (err) {
      console.error("Error redeeming points from member:", err);
      throw err;
    }
  }
  

  module.exports = {getMemberPointsByPhoneNumber, addPointsToMember, redeemPointsFromMember,};  