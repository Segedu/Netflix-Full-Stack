import React from 'react'

function Preferences({ showPreferencesDialog, setShowPreferencesDialog }) {
    return (
        <dialog open={showPreferencesDialog ? 'open' : 'close'}>
            <form onSubmit={() => {
                setShowPreferencesDialog(false)
            }}>
                <label for="Action">Action</label>
                <input type="checkbox" value="Action" />
                <label for="Animation">Animation</label>
                <input type="checkbox" value="Animation" />
                <label for="Adventure">Adventure</label>
                <input type="checkbox" value="Adventure" />
                <label for="Crime">Crime</label>
                <input type="checkbox" value="Crime" />
                <label for="Comedy">Comedy</label>
                <input type="checkbox" value="Comedy" />
                <label for="Drama">Drama</label>
                <input type="checkbox" value="Drama" />
                <label for="Documentary">Documentary</label>
                <input type="checkbox" value="Documentary" />
                <label for="Family">Family</label>
                <input type="checkbox" value="Family" />
                <label for="Fantasy">Fantasy</label>
                <input type="checkbox" value="Fantasy" />
                <label for="Mystery">Mystery</label>
                <input type="checkbox" value="Mystery" />
                <label for="Romance">Romance</label>
                <input type="checkbox" value="Romance" />
                <label for="Reality">Reality</label>
                <input type="checkbox" value="Reality" />
                <input type="submit" value="Save" />
            </form>
        </dialog>
    )
}

export default Preferences;