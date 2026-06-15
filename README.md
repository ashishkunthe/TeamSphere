# TeamSphere Frontend Plan

## Tech Stack

- React
- TypeScript
- React Router DOM
- Axios
- TailwindCSS
- React Query (Optional but Recommended)
- React Hook Form (Optional)

---

# Pages

## Authentication

### Login

Route:

```txt
/login
```

Features:

- Email Input
- Password Input
- Login Button

API:

```http
POST /auth/login
```

Store JWT token in localStorage.

---

### Register

Route:

```txt
/register
```

Features:

- Username Input
- Email Input
- Password Input
- Register Button

API:

```http
POST /auth/register
```

---

# Dashboard

Route:

```txt
/dashboard
```

Purpose:

- Show all rooms created by user.
- Create new room.

Layout:

```txt
------------------------------------------------
| Sidebar      | Main Area                     |
------------------------------------------------
| My Rooms     | Create Room Button            |
|              | Room Cards                    |
------------------------------------------------
```

API:

```http
GET /room/get-my-rooms
POST /room/create-room
```

---

# Room Details Page

Route:

```txt
/room/:roomId
```

Layout:

```txt
------------------------------------------------------
| Room Name                                          |
------------------------------------------------------
| Members | Notices | Files                          |
------------------------------------------------------
| Content Based On Selected Tab                      |
------------------------------------------------------
```

---

# Members Tab

Features:

- View members
- Add member
- Remove member

APIs:

```http
GET /room/get-my-rooms/:roomId
POST /room/add-member/:roomId
DELETE /room/delete-member/:roomId
```

---

# Notices Tab

Features:

- List notices
- Create notice
- Edit notice
- Delete notice

APIs:

```http
GET /notice/notices/:roomId
POST /notice/create-notice/:roomId
PATCH /notice/update-notice/:noticeId/:roomId
DELETE /notice/delete-notice/:noticeId
```

---

# Files Tab

Features:

- Upload file
- View uploaded files
- Delete uploaded file

APIs:

```http
GET /file/files/:roomId
POST /file/upload-file/:roomId
DELETE /file/delete-file/:roomId/:fileId
```

---

# Suggested Folder Structure

```txt
src
│
├── api
│   ├── auth.ts
│   ├── room.ts
│   ├── notice.ts
│   └── file.ts
│
├── pages
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── Room.tsx
│
├── components
│   ├── Sidebar.tsx
│   ├── RoomCard.tsx
│   ├── NoticeCard.tsx
│   ├── FileCard.tsx
│   ├── CreateRoomModal.tsx
│   ├── CreateNoticeModal.tsx
│   ├── UploadFileModal.tsx
│   └── AddMemberModal.tsx
│
├── context
│   └── AuthContext.tsx
│
├── hooks
│   ├── useRooms.ts
│   ├── useNotices.ts
│   └── useFiles.ts
│
├── routes
│   └── AppRoutes.tsx
│
└── utils
    └── axios.ts
```
