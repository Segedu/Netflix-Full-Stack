import React from 'react';
import style from './Preferences.module.css';

function Preferences({ showPreferencesDialog, setShowPreferencesDialog }) {

    return (
        <div className={style.preferences}>
            <dialog open={showPreferencesDialog ? 'open' : 'close'}>
                <form className={style.prefForm} onSubmit={() => {
                    setShowPreferencesDialog(false);
                }}>
                    <h3>For Personalized Recommendations, Share with us your Preferences</h3>
                    <article>
                        <label for="Action">Action</label>
                        <input type="checkbox" value="Action" />
                    </article>
                    <article>
                        <label for="Animation">Animation</label>
                        <input type="checkbox" value="Animation" />
                    </article>
                    <article>
                        <label for="Adventure">Adventure</label>
                        <input type="checkbox" value="Adventure" />
                    </article>
                    <article>
                        <label for="Crime">Crime</label>
                        <input type="checkbox" value="Crime" />
                    </article>
                    <article>
                        <label for="Comedy">Comedy</label>
                        <input type="checkbox" value="Comedy" />
                    </article>
                    <article>
                        <label for="Drama">Drama</label>
                        <input type="checkbox" value="Drama" />
                    </article>
                    <article>
                        <label for="Documentary">Documentary</label>
                        <input type="checkbox" value="Documentary" />
                    </article>
                    <article>
                    <label for="Family">Family</label>
                    <input type="checkbox" value="Family" />
                    </article>
                    <article>
                    <label for="Fantasy">Fantasy</label>
                    <input type="checkbox" value="Fantasy" />
                    </article>
                    <article>
                    <label for="Mystery">Mystery</label>
                    <input type="checkbox" value="Mystery" />
                    </article>
                    <article>
                    <label for="Romance">Romance</label>
                    <input type="checkbox" value="Romance" />
                    </article>
                    <article>
                    <label for="Reality">Reality</label>
                    <input type="checkbox" value="Reality" />
                    </article>
                    <input type="submit" value="Save" />
                </form>
            </dialog>
        </div>
    )
}

export default Preferences;