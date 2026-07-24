# Partner Data Verification Results

## A1. Demo Slug Partners
```json
[
  {
    "demo_slug_partners": "8"
  }
]
```

## A2. Pilot Seed Users
```json
[
  {
    "pilot_seed_users": "0"
  }
]
```

## A3. Seed Marked Tables
Error (Likely column doesn't exist): 
Invalid `prisma.$queryRawUnsafe()` invocation:


Raw query failed. Code: `42703`. Message: `column "source_type" does not exist`

## B1. Explicit Demo/Seed Partners (Fallback: no source_type column)
```json
[
  {
    "id": "ecdbff6e-2145-441d-b4b4-7d704e294ef3",
    "slug": "demo-builder",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:42:44.913Z"
  },
  {
    "id": "a05986e7-1c77-4950-a62c-c3a95ddd76e0",
    "slug": "demo-architect",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:44:34.979Z"
  },
  {
    "id": "7217147e-1248-4513-a814-99dbe9172fb5",
    "slug": "demo-interior-designer",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:44:36.606Z"
  },
  {
    "id": "864166d7-d83d-4795-94cc-aa69dbffd4b3",
    "slug": "demo-material-supplier",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:44:38.220Z"
  },
  {
    "id": "0eeebad1-7ac5-4def-aa26-ecc601f7ce86",
    "slug": "demo-home-automation",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:44:39.605Z"
  },
  {
    "id": "37deda46-574d-49e1-9a1e-578e17b05cd4",
    "slug": "demo-solar",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:44:41.230Z"
  },
  {
    "id": "a3e0430a-a3ca-48ac-9772-2085073b4556",
    "slug": "demo-elevator",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:44:42.842Z"
  },
  {
    "id": "2708a113-a118-4c55-a080-fda845c326ab",
    "slug": "demo-waterproofing",
    "verification_status": "pending",
    "active": true,
    "public_profile_enabled": false,
    "created_at": "2026-05-25T07:44:44.230Z"
  }
]
```

## B2. Heuristic Scan for Fictional/Seed Partners
```json
[]
```

## B3. Duplicate Phones across Partners
```json
[
  {
    "phone_hash": "e0ec043b3f9e198ec09041687e4d4e8d",
    "partners_sharing_number": "3"
  }
]
```

## B4. Publicly Exposed Flagged Partners
```json
[]
```

