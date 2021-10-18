(function () {
    'use strict';

    const CONTENT_URL = window.location.protocol + '//' + window.location.host + '/table';

    // Call the initialize API first
    microsoftTeams.initialize();

    // Check the initial theme user chose and respect it
    microsoftTeams.getContext(function (context) {
        if (context && context.theme) {
            setTheme(context.theme);
        }
    });

    // Handle theme changes
    microsoftTeams.registerOnThemeChangeHandler(function (theme) {
        setTheme(theme);
    });

    // Save configuration changes
    microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
        // Let the Microsoft Teams platform know what you want to load based on
        // what the user configured on this page
        microsoftTeams.settings.setSettings({
            contentUrl: CONTENT_URL, // Mandatory parameter
            entityId: CONTENT_URL, // Mandatory parameter
        });

        // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
        // for the app to call this API before it dismisses the dialog. If the wait times out, you will
        // see an error indicating that the configuration settings could not be saved.
        saveEvent.notifySuccess();
    });

    // Logic to let the user configure what they want to see in the tab being loaded
    document.addEventListener('DOMContentLoaded', function () {
        const teamNameInput = document.getElementById('teamNameInput');

        teamNameInput.addEventListener('input',function (event) {
            const teamName = event.target.value;
            console.log('On change handler invoked', teamName);

            if (teamName && teamName !== "") {
                microsoftTeams.settings.setValidityState(true);
            } else {
                microsoftTeams.settings.setValidityState(false);
            }
        });
    });

    // Set the desired theme
    function setTheme(theme) {
        if (theme) {
            // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
            document.body.className =
                'theme-' + (theme === 'default' ? 'light' : theme);
        }
    }
})();
