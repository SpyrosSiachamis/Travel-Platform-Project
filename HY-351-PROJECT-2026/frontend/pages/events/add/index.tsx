/* eslint-disable indent */
import styles from '@/styles/AddEvent.module.css'

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

export function AddEventBtn()
{
    return (
        <input type="submit" value="Add Event" className={styles.addeventbtn}/>
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

export function AddEventForm() {
    return (
        <div className={styles.addeventdiv}>
            <div className={styles.addeventform}>
                <h1 className={styles.formtitle}>Create a new Event</h1>
                <form className={styles.formcontainer}>
                    <div className={styles.inputfields}>
                        <div className={styles.griditem}>
                            <InputField id="eventtitle" iType="text" text="Event Title" />
                            <InputField id="eventlocation" iType="text" text="Location" />
                            <InputField id="eventprice" iType="text" text="Price" />
                            <DescriptionField />

                        </div>
                        <div className={styles.griditem}>
                            <InputField id="eventtype" iType="text" text="Choose Event Type" />
                            <InputField id="eventparticipants" iType="text" text="Maximum Participants" />
                            <InputField id="eventschedule" iType="text" text="Schedule" />
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