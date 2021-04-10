import * as util from 'util';
import fetch from 'node-fetch';

export function logAll(data: unknown): void {
  const args = {
    showHidden: false,
    depth: null,
    colors: true
  };

  console.log( util.inspect( data, args ) );
}

export async function fetchData<T>(url: string): Promise<T> {
  try {
    const request = await fetch(url);
    const data = await request.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function sendEmbeds(embeds: unknown, title: string, message: string): Promise<void> {
  try {
    const req = await fetch((process.env.WEBHOOK as string),
      {
        method: 'POST',
        body: JSON.stringify({ content: `***${title}***`, embeds: embeds }),
        headers: { 'Content-Type': 'application/json' }
      }
    );

    // logAll(req);
    if (req.status !== 200 && req.status !== 204) {
      throw new Error(req.statusText);
    }

    console.log(message);
  } catch (err) {
    console.log(err);
  }
}