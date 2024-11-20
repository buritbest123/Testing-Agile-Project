// Function to add a new member
// Initial Node: const { Mname, Tel, Alumni } = memberData;
// Final Node: return newMember;
// Basic Blocks (nodes):
// 1. const { Mname, Tel, Alumni } = memberData;
// 2. if (!Mname || !Tel || Alumni === undefined)
// 3. throw new Error("All member fields are required");
// 4. const existingMember = await db.collection("member").findOne({ Tel });
// 5. if (existingMember)
// 6. throw new Error("Member with this phone number already exists");
// 7. const lastMember = await db.collection("member").find({}).sort({ MID: -1 }).limit(1).toArray();
// 8. if (lastMember.length > 0)
// 9. const MID = lastMember[0].MID + 1;
// 10. else
// 11. const MID = 0;
// 12. const Points = 0;
// 13. const newMember = { MID, Mname, Tel, Points, Alumni };
// 14. await db.collection("member").insertOne(newMember);
// 15. return newMember;
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
// 4 -> 5
// 5 -> 6
// 5 -> 7
// 7 -> 8
// 8 -> 9
// 8 -> 11
// 9 -> 12
// 11 -> 12
// 12 -> 13
// 13 -> 14
// 14 -> 15
async function addMember(db, memberData) {
  const { Mname, Tel, Alumni } = memberData; // Node 1

  if (!Mname || !Tel || Alumni === undefined) { // Node 2
    throw new Error("All member fields are required"); // Node 3
  }

  const existingMember = await db.collection("member").findOne({ Tel }); // Node 4
  if (existingMember) { // Node 5
    throw new Error("Member with this phone number already exists"); // Node 6
  }

  const lastMember = await db
    .collection("member")
    .find({})
    .sort({ MID: -1 })
    .limit(1)
    .toArray(); // Node 7

  let MID; 
  if (lastMember.length > 0) { // Node 8
    MID = lastMember[0].MID + 1; // Node 9
  } else { // Node 10
    MID = 0; // Node 11
  }

  const Points = 0; // Node 12
  const newMember = { MID, Mname, Tel, Points, Alumni }; // Node 13
  await db.collection("member").insertOne(newMember); // Node 14

  return newMember; // Node 15
}


// Function to get a member by phone number
// Initial Node: const member = await db.collection("member").findOne({ Tel: tel });
// Final Node: return member;
// Basic Blocks (nodes):
// 1. const member = await db.collection("member").findOne({ Tel: tel });
// 2. if (!member)
// 3. throw new Error("Member not found");
// 4. return member;
// Control Flow (edges):
// 1 -> 2
// 2 -> 3
// 2 -> 4
async function getMemberByPhoneNumber(db, tel) {
  const member = await db.collection("member").findOne({ Tel: tel }); // Node 1
  if (!member) { // Node 2
    throw new Error("Member not found"); // Node 3
  }
  return member; // Node 4
}

// Function to get all members
// Initial Node: const members = await db.collection("member").find({}).toArray();
// Final Node: return members;
// Basic Blocks (nodes):
// 1. const members = await db.collection("member").find({}).toArray();
// 2. return members;
// Control Flow (edges):
// 1 -> 2
async function getAllMembers(db) {
  const members = await db.collection("member").find({}).toArray(); // Node 1
  return members; // Node 2
}

// Function to get record history
// Initial Node: const record = await db.collection("record").find({}).toArray();
// Final Node: return record;
// Basic Blocks (nodes):
// 1. const record = await db.collection("record").find({}).toArray();
// 2. return record;
// Control Flow (edges):
// 1 -> 2
async function getRecordHistory(db) {
  const record = await db.collection("record").find({}).toArray(); // Node 1
  return record; // Node 2
}

module.exports = {
  addMember,
  getMemberByPhoneNumber,
  getAllMembers,
  getRecordHistory,
};
