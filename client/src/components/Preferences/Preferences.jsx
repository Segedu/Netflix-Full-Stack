import React from 'react';
import style from './Preferences.module.css';
import { useContext } from 'react';
import { updateUserPreferences } from '../../clientUtils/clientUtils';
import Context from '../context.jsx';

function Preferences() {
    const { showPreferencesDialog, setShowPreferencesDialog, auth } = useContext(Context);

    const genres = [
        { name: 'Action', isChecked: false, },
        { name: 'Animation', isChecked: false },
        { name: 'Adventure', isChecked: false },
        { name: 'Crime', isChecked: false },
        { name: 'Comedy', isChecked: false },
        { name: 'Drama', isChecked: false },
        { name: 'Documentary', isChecked: false },
        { name: 'Family', isChecked: false },
        { name: 'Fantasy', isChecked: false },
        { name: 'Mystery', isChecked: false },
        { name: 'Romance', isChecked: false },
        { name: 'Reality', isChecked: false },
    ]

    function setAsChecked(e) {
        let foundObj = genres.find(obj => obj.name === e.target.value)
        foundObj.isChecked = true;
    }

    function getUserGenrePreferences() {
        let userPreferencesArr = genres.filter(obj => obj.isChecked == true);
        updateUserPreferences(auth.localId, userPreferencesArr);
    }

    return (
        <div className={style.preferences}>
            <dialog open={showPreferencesDialog ? 'open' : 'close'}>
                <form className={style.prefForm} onSubmit={(e) => {
                    e.preventDefault()
                    setShowPreferencesDialog(false);
                    getUserGenrePreferences()
                }}>
                    <button onClick={(e) => { e.preventDefault(); setShowPreferencesDialog(false) }}>X</button>

                    <h3>For Personalized Recommendations, Share with us your Preferences</h3>
                    <article>
                        <label for="Action">Action</label>
                        <input type="checkbox" value="Action" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Animation">Animation</label>
                        <input type="checkbox" value="Animation" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Adventure">Adventure</label>
                        <input type="checkbox" value="Adventure" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Crime">Crime</label>
                        <input type="checkbox" value="Crime" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Comedy">Comedy</label>
                        <input type="checkbox" value="Comedy" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Drama">Drama</label>
                        <input type="checkbox" value="Drama" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Documentary">Documentary</label>
                        <input type="checkbox" value="Documentary" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Family">Family</label>
                        <input type="checkbox" value="Family" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Fantasy">Fantasy</label>
                        <input type="checkbox" value="Fantasy" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Mystery">Mystery</label>
                        <input type="checkbox" value="Mystery" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Romance">Romance</label>
                        <input type="checkbox" value="Romance" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <article>
                        <label for="Reality">Reality</label>
                        <input type="checkbox" value="Reality" onChange={(e) => { setAsChecked(e) }} />
                    </article>
                    <input type="submit" value="Save" onChange={(e) => { setAsChecked(e) }} />
                </form>
            </dialog>

        </div>
    )
}

export default Preferences;