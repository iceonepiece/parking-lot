import { app } from '../../src/app';
import db from '../../src/db';

const createParkingSlots = async (parkingLotId, maxSlots) => {
  const mockParkingSlots = [];
  for (let i = 0; i < maxSlots; i += 1) {
    mockParkingSlots.push({
      parkingLotId,
      slotNumber: i + 1,
    });
  }
  await db.ParkingSlot.bulkCreate(mockParkingSlots);
}

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('POST /parking-lots/:id/park', () => {
  test('(200) should park a car successfully', async () => {
    const mockParkingLot = {
      id: 99,
      name: 'park-test',
      maxSlots: 3,
    };

    await db.ParkingLot.create(mockParkingLot);
    await createParkingSlots(mockParkingLot.id, mockParkingLot.maxSlots);

    const res = await app.inject({
      method: 'POST',
      url: `/parking-lots/${mockParkingLot.id}/park`,
      payload: {
        plateNumber: 'WW1942',
        size: 'small',
      },
    });

    const data = JSON.parse(res.payload);
    expect(res.statusCode).toBe(200);
    expect(data).toMatchObject({
      slotNumber: 1,
    });
  });

  test('(400) should return message [parking_lot_is_not_available]', async () => {
    const mockParkingLot = {
      id: 100,
      name: 'park-test',
      maxSlots: 2,
    };

    await db.ParkingLot.create(mockParkingLot);
    await createParkingSlots(mockParkingLot.id, mockParkingLot.maxSlots);

    // park the first car
    await app.inject({
      method: 'POST',
      url: `/parking-lots/${mockParkingLot.id}/park`,
      payload: {
        plateNumber: 'A1',
        size: 'small',
      },
    });

    // park the second car
    await app.inject({
      method: 'POST',
      url: `/parking-lots/${mockParkingLot.id}/park`,
      payload: {
        plateNumber: 'B2',
        size: 'medium',
      },
    });

    // park the third car
    // should throw error because parking slot's already been full
    const res = await app.inject({
      method: 'POST',
      url: `/parking-lots/${mockParkingLot.id}/park`,
      payload: {
        plateNumber: 'C3',
        size: 'large',
      },
    });

    const data = JSON.parse(res.payload);
    expect(res.statusCode).toBe(400);
    expect(data).toMatchObject({
      message: 'parking_lot_is_not_available'
    });
  });

});
