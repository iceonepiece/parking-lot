import { app } from '../../src/app';
import db from '../../src/db';

const mockParkingLot = {
  id: 1000,
  name: 'parking-lot-test',
  maxSlots: 2,
};

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  await db.ParkingLot.create(mockParkingLot);

  const mockParkingSlots = [];
  for (let i = 0; i < mockParkingLot.maxSlots; i += 1) {
    mockParkingSlots.push({
      parkingLotId: mockParkingLot.id,
      slotNumber: i + 1,
    });
  }
  await db.ParkingSlot.bulkCreate(mockParkingSlots);
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('GET /parking-lots/:id', () => {
  test('(200) should return status of the parking lot', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/parking-lots/${mockParkingLot.id}`,
    });

    const data = JSON.parse(res.payload);
    expect(res.statusCode).toBe(200);

    expect(data).toMatchObject({
      ...mockParkingLot,
      parkingSlots: [
        {
          slotNumber: 1,
          available: true,
        },
        {
          slotNumber: 2,
          available: true,
        },
      ],
    });
  });
});
