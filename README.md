### How to run
- Docker desktop installed on host machine
- Run Docker desktop
- Cd to this folder
- Run command: 
    - For dev purpose (realtime update on code change): `docker compose up --build -d `
    - For serving (build, serve client using nginx): `docker compose -f docker-compose.prod.yaml up --build -d`
- Access client on http://localhost:3000
- Access server on http://localhost:1999
- Stop container: `docker compose down`

### Note
- TodoDatabase.sql: unused
- Realtime update on code changes using bind mount, anonymous volume
