import React, { ReactElement, KeyboardEvent } from 'react';
import { Flag } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import styles from './languageSelect.scss';

const LanguageSelect = (): ReactElement => {
    const { i18n } = useTranslation();

    const changeLanguage = (language: string): void => {
        i18n.changeLanguage(language);
    };
    return (
        <div className={styles.languageSelect}>
            <div
                className={
                    i18n.language === 'en' || i18n.language === 'en-US'
                        ? styles.selectedLanguage
                        : ''
                }
                id="en"
                onClick={() => {
                    if (i18n.language === 'en') {
                        return;
                    }
                    changeLanguage('en');
                }}
                onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                    if (i18n.language === 'en') {
                        return;
                    }
                    if (event.key === 'Enter' || event.key === 'Space') {
                        changeLanguage('en');
                    }
                }}
                role="button"
                tabIndex={0}
            >
                English <Flag name="uk" />
            </div>
            <div
                className={
                    i18n.language === 'pl' ? styles.selectedLanguage : ''
                }
                id="pl"
                onClick={() => {
                    if (i18n.language === 'pl') {
                        return;
                    }
                    changeLanguage('pl');
                }}
                onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                    if (i18n.language === 'pl') {
                        return;
                    }
                    if (event.key === 'Enter' || event.key === 'Space') {
                        changeLanguage('pl');
                    }
                }}
                role="button"
                tabIndex={0}
            >
                Polski <Flag name="pl" />
            </div>
        </div>
    );
};

export default LanguageSelect;
