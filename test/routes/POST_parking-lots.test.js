import { app } from '../../src/app';
import db from '../../src/db';

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('POST /parking-lots', () => {
  test('(200) should create a parking lot successfully', async () => {
    const parkingLotPayload = {
      name: 'test-parking-lot',
      maxSlots: 5,
    };

    const res = await app.inject({
      method: 'POST',
      url: '/parking-lots',
      payload: parkingLotPayload,
    });

    const data = JSON.parse(res.payload);
    expect(res.statusCode).toBe(200);
    expect(data).toMatchObject(parkingLotPayload);

    const createdParkingLot = await db.ParkingLot.findByPk(data.id);
    expect(createdParkingLot).toMatchObject(parkingLotPayload);

    const createdParkingSlots = await db.ParkingSlot.findAll({
      where: {
        parkingLotId: data.id,
      },
    });
    expect(createdParkingSlots.length).toBe(parkingLotPayload.maxSlots);
  });

  test('(400) should return message [parameter_{name}_not_provided]', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/parking-lots',
      payload: { maxSlots: 4 },
    });

    const data = JSON.parse(res.payload);
    expect(res.statusCode).toBe(400);
    expect(data.message).toBe('parameter_{name}_not_provided');
  });

  test('(400) should return message [parameter_{maxSlots}_not_provided]', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/parking-lots',
      payload: { name: 'x' },
    });

    const data = JSON.parse(res.payload);
    expect(res.statusCode).toBe(400);
    expect(data.message).toBe('parameter_{maxSlots}_not_provided');
  });
});
