const { addMember, getMemberByPhoneNumber, getAllMembers, getRecordHistory } = require("../Database member/memberController");

describe("memberController", () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      insertOne: jest.fn()
    };
  });

  // Test Case 1: Add a new member successfully
  // Test Requirements: TR = {1, 2, 4, 5, 7, 8, 9, 12, 13, 14, 15}
  // Test Paths: t1 = [1, 2, 4, 5, 7, 8, 9, 12, 13, 14, 15]
  it("should add a new member successfully", async () => {
      const memberData = { Mname: "John Doe", Tel: "123456789", Alumni: true };
      mockDb.findOne.mockResolvedValue(null);
      mockDb.toArray.mockResolvedValue([{ MID: 1 }]);
      mockDb.insertOne.mockResolvedValue({});

      const result = await addMember(mockDb, memberData);

      expect(result).toEqual({
          MID: 2,
          Mname: "John Doe",
          Tel: "123456789",
          Points: 0,
          Alumni: true,
      });
      expect(mockDb.findOne).toHaveBeenCalledWith({ Tel: "123456789" });
      expect(mockDb.insertOne).toHaveBeenCalledWith(result);
  });

  // Test Case 2: Add a member with missing fields
  // Test Requirements: TR = {1, 2, 3}
  // Test Paths: t2 = [1, 2, 3]
  it("should throw an error if required fields are missing", async () => {
      const memberData = { Mname: "", Tel: "123456789", Alumni: true };

      await expect(addMember(mockDb, memberData)).rejects.toThrow(
          "All member fields are required"
      );
  });

  // Test Case 3: Add a member with an existing phone number
  // Test Requirements: TR = {1, 2, 4, 5, 6}
  // Test Paths: t3 = [1, 2, 4, 5, 6]
  it("should throw an error if member with the same phone number already exists", async () => {
      const memberData = { Mname: "John Doe", Tel: "123456789", Alumni: true };
      mockDb.findOne.mockResolvedValue({ MID: 1 });

      await expect(addMember(mockDb, memberData)).rejects.toThrow(
          "Member with this phone number already exists"
      );
  });

  // Test Case 4: Fetch a member by phone number
  // Test Requirements: TR = {1, 2, 3, 4}
  // Test Paths: t4 = [1, 2, 4]
  it("should fetch a member by phone number", async () => {
      mockDb.findOne.mockResolvedValue({
          MID: 1,
          Mname: "John Doe",
          Tel: "123456789",
          Points: 0,
          Alumni: true,
      });

      const result = await getMemberByPhoneNumber(mockDb, "123456789");

      expect(result).toEqual({
          MID: 1,
          Mname: "John Doe",
          Tel: "123456789",
          Points: 0,
          Alumni: true,
      });
      expect(mockDb.findOne).toHaveBeenCalledWith({ Tel: "123456789" });
  });

  // Test Case 5: Member not found by phone number
  // Test Requirements: TR = {1, 2, 3}
  // Test Paths: t5 = [1, 2, 3]
  it("should throw an error if member not found by phone number", async () => {
      mockDb.findOne.mockResolvedValue(null);

      await expect(getMemberByPhoneNumber(mockDb, "123456789")).rejects.toThrow(
          "Member not found"
      );
  });

  // Test Case 6: Fetch all members
  // Test Requirements: TR = {1, 2}
  // Test Paths: t6 = [1, 2]
  it("should fetch all members", async () => {
      mockDb.toArray.mockResolvedValue([
          { MID: 1, Mname: "John Doe", Tel: "123456789", Points: 0, Alumni: true },
      ]);

      const result = await getAllMembers(mockDb);

      expect(result).toEqual([
          { MID: 1, Mname: "John Doe", Tel: "123456789", Points: 0, Alumni: true },
      ]);
      expect(mockDb.find).toHaveBeenCalledWith({});
  });

  // Test Case 7: Fetch record history
  // Test Requirements: TR = {1, 2}
  // Test Paths: t7 = [1, 2]
  it("should fetch record history", async () => {
      mockDb.toArray.mockResolvedValue([
          { Record_ID: 1, MemberID: 1, Date: "2024-01-01" },
      ]);

      const result = await getRecordHistory(mockDb);

      expect(result).toEqual([{ Record_ID: 1, MemberID: 1, Date: "2024-01-01" }]);
      expect(mockDb.find).toHaveBeenCalledWith({});
  });
});
