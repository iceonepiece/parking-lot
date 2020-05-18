# parking-lot
Parking Lot API

## API Endpoints

#### 1) It should provide us with api to create parking lot
```
POST /parking-lots

Body
  - name: String
  - maxSlots: Int
```

#### 2) It should provide us with api to park the car
```
POST /parking-lots/:id/park

Body
 - plateNumber: String
 - size: enum('small', 'medium', 'large')
```

#### 3) It should provide us with api to leave the slot
```
POST /parking-lots/:id/leave

Body
  - slotNumber: Int
```

#### 4) It should provide us with api to get status of parking lot
```
GET /parking-lots/:id
```

#### 5) It should provide us with api to get registration plate number list by car size
```
GET /parking-lots/:id/car-plate-numbers

Query
- carSize: enum('small', 'medium', 'large')
```

#### 6) It should provide us with api to get registration allocated slot number list by car size
```
GET /parking-lots/:id/parked-slot-numbers

Query
- carSize: enum('small', 'medium', 'large')
```
