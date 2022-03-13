import React from 'react';
import { useContext } from 'react';
import { updateUserPreferences } from '../../clientUtils/clientUtils';
import Context from '../context.jsx';
import style from './Preferences.module.css';

function Preferences() {
    const { auth,showPreferencesDialog, setShowPreferencesDialog } = useContext(Context);


    const genres = [
        { name: 'Action', isChecked: false, id: 28 },
        { name: 'Animation', isChecked: false, id: 16 },
        { name: 'Adventure', isChecked: false, id: 12 },
        { name: 'Crime', isChecked: false, id: 80 },
        { name: 'Comedy', isChecked: false, id: 35 },
        { name: 'Drama', isChecked: false, id: 18 },
        { name: 'Documentary', isChecked: false, id: 99 },
        { name: 'Family', isChecked: false, id: 10751 },
        { name: 'Fantasy', isChecked: false, id: 10765 },
        { name: 'Mystery', isChecked: false, id: 9648 },
        { name: 'Romance', isChecked: false, id: 10749 },
        { name: 'Reality', isChecked: false, id: 10764 },
        { name: "Science Fiction", isChecked: false, id: 878 }
    ]

    function setAsChecked(e) {
        let foundObj = genres.find(obj => obj.name === e.target.value)
        foundObj.isChecked = true;
    }

    function getUserGenrePreferences() {
        let genrePreferencesArr = genres.filter(obj => obj.isChecked == true);
        const userPreferencesArr = genrePreferencesArr.map(({ name, isChecked, ...rest }) => {
            return rest.id;
        });
        updateUserPreferences(auth.localId, userPreferencesArr);
    }

    return (

        <div className={style.preferences} style={{ display: showPreferencesDialog ? "block" : "none" }}>
            <form className={style.prefForm} onSubmit={(e) => {
                e.preventDefault();
                setShowPreferencesDialog(false);
                getUserGenrePreferences();
            }}>
                <button onClick={() => { setShowPreferencesDialog(false) }}>x</button>

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
                <input type="submit" value="Save" />
            </form>
        </div >


    )
}

export default Preferences;