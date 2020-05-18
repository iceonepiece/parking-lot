import { app } from '../../src/app';
import db from '../../src/db';

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('POST /parking-lots/:id/leave', () => {
  test('(200) should leave a slot successfully', async () => {
    const mockParkingLot = {
      id: 99,
      name: 'park-test',
      maxSlots: 1,
    };

    const mockCar = {
      plateNumber: 'leaving_car',
      size: 'large',
    };

    await db.ParkingLot.create(mockParkingLot);
    await db.ParkingSlot.bulkCreate([
      {
        parkingLotId: mockParkingLot.id,
        slotNumber: 1,
        carPlateNumber: 'leaving_car',
        carSize: 'large',
      },
    ]);

    const res = await app.inject({
      method: 'POST',
      url: `/parking-lots/${mockParkingLot.id}/leave`,
      payload: {
        slotNumber: 1,
      },
    });

    const data = JSON.parse(res.payload);
    expect(res.statusCode).toBe(200);

    const leftParkingSlot = await db.ParkingSlot.findOne({
      where: {
        parkingLotId: mockParkingLot.id,
        slotNumber: 1,
      },
    });
    expect(leftParkingSlot).toMatchObject({
      carPlateNumber: null,
      carSize: null,
    });
  });
});
