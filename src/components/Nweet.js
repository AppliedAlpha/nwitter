import React, {useState} from "react";
import {dbService, storageService} from "fBase";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [editedNweet, setEditedNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure to delete this nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachmentUrl !== "")
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: editedNweet
        });
        setEditing(false);
    };

    const onChange = (event) => {
        const {target: {value}, } = event;
        setEditedNweet(value);
    };

    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text"
                                   placeholder="Edit your nweet"
                                   value={editedNweet}
                                   onChange={onChange}
                                   required />
                            <input type="submit"
                                   value="Update Nweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && (
                            <img src={nweetObj.attachmentUrl}
                                 width="50px"
                                 height="50px" />
                        )}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={toggleEditing}>Edit</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    )
};

export default Nweet;