import Head from 'next/head';
import Link from 'next/link';
import type { CSSProperties } from 'react';

type EventItem = {
  event_id: number;
  trip_creator_id: number;
  title: string;
  event_date: string;
  event_time: string;
  type: string;
  status: string;
  max_participants: number;
  price: string;
  description: string;
  schedule: string;
  rating: string;
  preview_image: string;
  city: string;
  street: string;
  number: string;
  postal_code: string;
};

type EventDetailsProps = {
  event: EventItem | null;
};

const navButton: CSSProperties = {
  minWidth: '95px',
  height: '32px',
  border: '1.5px solid black',
  borderRadius: '9px',
  background: 'white',
  color: 'black',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  cursor: 'pointer'
};

function Header() {
  return (
    <header style={{
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
      background: 'white',
      padding: '0 28px',
      gap: '28px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '180px' }}>
        <div style={{
          width: '55px',
          height: '55px',
          border: '6px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '26px'
        }}>
          M
        </div>
        <div style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '22px', lineHeight: '25px' }}>
          Travel<br />Heraklion
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '14px', flex: 1 }}>
        <Link href="/" style={navButton}>Home</Link>
        <Link href="/events" style={navButton}>Events</Link>
      </nav>

      <nav style={{ display: 'flex', gap: '14px' }}>
        <button style={navButton}>Favourites</button>
        <button style={navButton}>History</button>
        <button style={navButton}>
          Notifications <span style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            background: '#c60000',
            borderRadius: '50%',
            marginLeft: 4
          }} />
        </button>
        <Link href="/events/add" style={navButton}>Add Event</Link>
        <button style={navButton}>Profile</button>
        <button style={navButton}>Settings</button>
      </nav>
    </header>
  );
}

export default function EventDetailsPage({ event }: EventDetailsProps) {
  if (!event) {
    return (
      <>
        <Header />
        <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Event not found</h1>
          <Link href="/events">Back to events</Link>
        </main>
      </>
    );
  }

  const eventDate = new Date(event.event_date).toLocaleDateString('en-GB');

  return (
    <>
      <Head>
        <title>{event.title}</title>
      </Head>

      <main style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f7f7f7' }}>
        <Header />

        <section style={{
          minHeight: 'calc(100vh - 72px)',
          padding: '40px 70px',
          backgroundImage: 'url("/images/events-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div style={{
            maxWidth: '1180px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
            overflow: 'hidden'
          }}>
            <img
              src={event.preview_image}
              alt={event.title}
              style={{
                width: '100%',
                height: '360px',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '35px',
              padding: '35px 45px'
            }}>
              <div>
                <h1 style={{
                  fontSize: '38px',
                  margin: '0 0 15px 0',
                  fontStyle: 'italic'
                }}>
                  {event.title}
                </h1>

                <p style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  marginBottom: '25px'
                }}>
                  {event.description}
                </p>

                <h2 style={{ fontSize: '26px', marginBottom: '10px' }}>Schedule</h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  whiteSpace: 'pre-line'
                }}>
                  {event.schedule}
                </p>
              </div>

              <aside style={{
                background: '#f5eeee',
                borderRadius: '10px',
                padding: '25px',
                height: 'fit-content'
              }}>
                <h2 style={{ marginTop: 0 }}>Event Details</h2>

                <p><b>Type:</b> {event.type}</p>
                <p><b>Status:</b> {event.status}</p>
                <p><b>Date:</b> {eventDate}</p>
                <p><b>Time:</b> {event.event_time}</p>
                <p><b>Location:</b> {event.city}, {event.street} {event.number}</p>
                <p><b>Participants:</b> max {event.max_participants}</p>
                <p><b>Rating:</b> {event.rating}</p>
                <p><b>Price:</b> {Number(event.price).toFixed(0)}€</p>

                <button style={{
                  width: '100%',
                  marginTop: '20px',
                  height: '42px',
                  border: 'none',
                  borderRadius: '20px',
                  background: '#079b52',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Join Event
                </button>

                <button style={{
                  width: '100%',
                  marginTop: '12px',
                  height: '42px',
                  border: '1px solid black',
                  borderRadius: '20px',
                  background: 'white',
                  color: 'black',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}>
                  Add to Favourites
                </button>

                <Link
                  href="/events"
                  style={{
                    display: 'block',
                    marginTop: '18px',
                    textAlign: 'center',
                    color: 'black'
                  }}
                >
                  Back to events
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const res = await fetch(`http://backend:5000/events/${id}`);
  const event = await res.json();

  return {
    props: {
      event: event || null,
    },
  };
}