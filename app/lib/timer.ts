// a timer to upload the request count to neon every hour

// The Neon database connection
import { neon } from '@neondatabase/serverless';

export default function handler(): void {
    console.log('Request Count uploaded to neon!');
    const count = readCounter();
    /*
    if (!(count === 0)) {
        addRequestCount(count)
        console.log('Request Count uploaded to neon!');
        return;
    } else {
        console.log('No requests to upload');
        return;
    }
    */

    addRequestCount(count)
        console.log('Request Count uploaded to neon!');
        return;
}


// inmemory counter for the stats
let counter = 0;

export function incrementCounter() {
    counter += 1;
}

function readCounter(): number {
    return counter;
}


// ===== REQUEST COUNTER =====
//
// function to add the request count to the NEON database
async function addRequestCount(request_count: number) {
    'use server';

    const time = getFormattedDateTime();

    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined');
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`INSERT INTO public.requests (count, date) VALUES (${request_count}, ${time})`;
}


// ====== FORMAT TIME ======
//
// function to format the time for the NEON database
function getFormattedDateTime(): string {
    const now = new Date();

    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1); // Monate sind 0-basiert
    const day = pad(now.getDate());

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
