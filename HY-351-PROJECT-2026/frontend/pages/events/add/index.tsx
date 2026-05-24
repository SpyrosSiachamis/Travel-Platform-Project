/* eslint-disable indent */
import styles from '@/styles/AddEvent.module.css'
import { useEffect, useState } from 'react';

type EventItem = {
    title: string;
    event_date: string;
    max_participants: number;
    type: string;

    trip_creator_id?: number;
    event_time?: string;
    status?: string;
    price?: string | number;
    description?: string;
    schedule?: string;
    address_id?: number;
    rating?: number;
    preview_image?: string | null;
};

export enum EventTypes {
    Other = "Other",
    NightLife = "Night Life",
    City = "City",
    Nature = "Nature",
    Cultural = "Cultural",
}

type InputType = {
    id: string;
    text: string;
    iType: string;
};

export function InputField(type: InputType) {
    return (
        <>
            <div className={styles.inputdiv}>
                <label htmlFor={type.id} className={styles.inputlabel}>{type.text}</label>
                <input id={type.id} name={type.id} type={type.iType} placeholder={type.text} className={styles.inputfield}></input>
            </div>
        </>
    );
}

export function AddEventBtn() {
    return (
        <input type="submit" value="Add Event" className={styles.addeventbtn} />
    )
}

export function FileUploadField() {
    return (
        <>
            <label htmlFor='image' id='imageLabel' className={styles.filelabel}>
                Add Event Image
                <div className={styles.fileinputdiv}>
                    <div className={styles.imagediv}></div>
                </div>
            </label>
            <input type="file" id="image" name="imageFile" accept="image/png, image/jpeg" className={styles.customfileinput} />
        </>
    );
}

export function DescriptionField() {
    return (
        <>
            <label htmlFor='description' id='descriptionLabel' className={styles.inputlabel}>Description</label>
            <textarea
                id="description"
                name="description"
                placeholder='Enter event description'
                className={styles.descriptionfield}
            />
        </>
    );
}

export function SelectField({ id, text, options }: SelectType) {
    return (
        <div className={styles.inputdiv}>
            <label htmlFor={id} className={styles.inputlabel}>{text}</label>
            <select id={id} name={id} className={styles.inputfield}>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

type SelectType = {
    id: string;
    text: string;
    options: string[];
};

export async function addEvent(eventData: FormData | null) {
    try {
        if (!eventData) {
            throw new Error('Missing form data');
        }
        const response = await fetch('http://localhost:5000/events/add', {
            method: "POST",
            credentials: "include",
            body: eventData,
        });
        if (!response.ok) {
            throw new Error('Failure adding event');
        }
        const result: EventItem = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function AddEventForm() {
    const [submit, setSubmit] = useState<number>(0);
    const [eventInfo, setEventInfo] = useState<FormData | null>(null);

    useEffect(() => {
        async function sendData() {
            if (submit === 1) {
                const result = await addEvent(eventInfo);
                console.log("Event Created:", result);
                setSubmit(0);
            }
        }
        sendData();
    }, [submit, eventInfo])

    async function addEventHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setEventInfo(formData);
        setSubmit(1);
    }

    return (
        <div className={styles.addeventdiv}>
            <div className={styles.addeventform}>
                <h1 className={styles.formtitle}>Create a new Event</h1>
                <form className={styles.formcontainer} onSubmit={addEventHandler}>
                    <div className={styles.inputfields}>
                        <div className={styles.griditem}>
                            <InputField id="eventtitle" iType="text" text="Event Title" />
                            <InputField id="eventlocation" iType="text" text="Location" />
                            <InputField id="eventprice" iType="text" text="Price" />
                            <DescriptionField />

                        </div>
                        <div className={styles.griditem}>
                            <SelectField id="eventtype" text="Choose Event Type" options={Object.values(EventTypes)} />
                            <InputField id="eventparticipants" iType="text" text="Maximum Participants" />
                            <InputField id="eventschedule" iType="text" text="Schedule" />
                            <InputField id="eventdate" iType="date" text="Event Date" />
                            <FileUploadField />
                        </div>
                    </div>
                    <div className={styles.addeventcontainer}>
                        <AddEventBtn />
                    </div>
                </form>
            </div>
        </div>
    );
}



export default function AddEventPage() {
    return (
        <>
            <main className={styles.mainsection}>
                <div className={styles.backgrounddiv}></div>
                <AddEventForm />
            </main>
        </>
    );
}