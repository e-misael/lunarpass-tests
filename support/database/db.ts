import { Pool } from 'pg'
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely'
import { Mission, Reservation, Ticket } from '../interfaces/types'

interface Database {
    missions: Mission,
    reservations: Reservation,
    tickets: Ticket
}
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.POSTGRES_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  })
})

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()]
})

export async function cleanMission (mission: Mission) {
    await deleteMission(mission.id);
    await deleteReservation(mission.id);
    await deleteTicket(mission.id);
}

export async function cleanAndInsertMission(mission: Mission) {
    await deleteMission(mission.id);
    await insertMission(mission);
}

async function insertMission (mission: Mission) {
    await db.insertInto('missions').values(mission).execute();
}

async function deleteMission (missionId: string) {
    await db.deleteFrom('missions').where('id', '=', missionId).execute();
}

export async function deleteReservation (missionId: string) {
    await db.deleteFrom('reservations').where('missionId', '=', missionId).execute();
}

export async function deleteTicket (missionId: string) {
    await db.deleteFrom('tickets').where('missionId', '=', missionId).execute();
}