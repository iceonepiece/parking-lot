import { app } from '../../src/app';
import db from '../../src/db';

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('GET /parking-lots/:id/car-plate-numbers', () => {
  test('(200) should return registration plate number list by car size', async () => {
    const mockParkingLot = {
      id: 1234,
      name: 'car-plate-numbers-test',
      maxSlots: 3,
    };

    await db.ParkingLot.create(mockParkingLot);
    await db.ParkingSlot.bulkCreate([
      {
        parkingLotId: mockParkingLot.id,
        slotNumber: 1,
        carPlateNumber: 'FIRST_SMALL_CAR',
        carSize: 'small',
      },
      {
        parkingLotId: mockParkingLot.id,
        slotNumber: 2,
        carPlateNumber: 'FIRST_LARGE_CAR',
        carSize: 'large',
      },
      {
        parkingLotId: mockParkingLot.id,
        slotNumber: 3,
        carPlateNumber: 'SECOND_SMALL_CAR',
        carSize: 'small',
      },
    ]);

    const res_1 = await app.inject({
      method: 'GET',
      url: `/parking-lots/${mockParkingLot.id}/car-plate-numbers?carSize=small`,
    });
    const data_1 = JSON.parse(res_1.payload);
    expect(res_1.statusCode).toBe(200);

    expect(data_1).toMatchObject([
      'FIRST_SMALL_CAR',
      'SECOND_SMALL_CAR',
    ]);

    const res_2 = await app.inject({
      method: 'GET',
      url: `/parking-lots/${mockParkingLot.id}/car-plate-numbers?carSize=large`,
    });
    const data_2 = JSON.parse(res_2.payload);
    expect(res_2.statusCode).toBe(200);

    expect(data_2).toMatchObject([
      'FIRST_LARGE_CAR',
    ]);
  });
});
