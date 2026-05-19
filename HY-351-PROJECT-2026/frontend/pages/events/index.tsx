import Head from 'next/head';
import Link from 'next/link';

type EventItem = {
  event_id: number;
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

type EventsPageProps = {
  events: EventItem[];
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

const navButton: React.CSSProperties = {
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

export default function EventsPage({ events }: EventsPageProps) {
  const topPick = events[events.length - 1] || events[0];

  return (
    <>

      <main style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: 'white' }}>
        <Header />

        <section style={{
          height: '260px',
          backgroundImage: 'url("/images/events-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '38px',
            fontWeight: 'bold',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)'
          }}>
            Browse Available Events
          </h1>
        </section>

        <section style={{ padding: '8px 26px 40px 26px' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 24px 0' }}>Recommended for you</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '52px',
            marginBottom: '10px'
          }}>
            {events.map((event) => (
              <Link
                href={`/events/${event.event_id}`}
                key={event.event_id}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <article style={{
                  height: '240px',
                  borderRadius: '10px',
                  background: '#f5eeee',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img
                    src={event.preview_image}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '135px',
                      objectFit: 'cover',
                      display: 'block',
                      background: '#ddd'
                    }}
                  />

                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'white',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: '#8fa9b9'
                  }}>
                    ♥
                  </div>

                  <div style={{ padding: '8px 12px' }}>
                    <div style={{
                      fontSize: '18px',
                      minHeight: '52px',
                      overflow: 'hidden'
                    }}>
                      {event.title}
                    </div>

                    <div style={{
                      textAlign: 'right',
                      fontSize: '18px',
                      marginTop: '20px'
                    }}>
                      Price: {Number(event.price).toFixed(0)}€
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {topPick && (
            <>
              <h2 style={{ fontSize: '24px', margin: '6px 0 10px 0' }}>Today’s top pick</h2>

              <Link
                href={`/events/${topPick.event_id}`}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <section style={{
                  width: '760px',
                  display: 'grid',
                  gridTemplateColumns: '430px 330px',
                  background: '#f5eeee',
                  borderRadius: '0 14px 14px 14px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={topPick.preview_image}
                    alt={topPick.title}
                    style={{
                      width: '430px',
                      height: '300px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  <div style={{ padding: '14px 16px' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                      {topPick.title}
                    </h3>
                    <p style={{ fontSize: '18px', lineHeight: '22px', margin: 0 }}>
                      {topPick.description}
                    </p>
                  </div>
                </section>
              </Link>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://backend:5000/events');
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}