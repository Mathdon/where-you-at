(function () {
    'use strict';

    const locations = ['Please select location', 'Home', 'Not working'];

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
        const locationsUrlQuery = `?locations=${locations.join(',')}`;
        const contentUrl = window.location.protocol + '//' + window.location.host + `/calender${locationsUrlQuery}`;
        // Let the Microsoft Teams platform know what you want to load based on
        // what the user configured on this page
        microsoftTeams.settings.setSettings({
            contentUrl: contentUrl, // Mandatory parameter
            entityId: contentUrl, // Mandatory parameter
        });

        // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
        // for the app to call this API before it dismisses the dialog. If the wait times out, you will
        // see an error indicating that the configuration settings could not be saved.
        saveEvent.notifySuccess();
    });

    // Logic to let the user configure what they want to see in the tab being loaded
    document.addEventListener('DOMContentLoaded', function () {
        microsoftTeams.settings.setValidityState(true);

        document.getElementById('addLocationButton').addEventListener('click', function () {
            const location = document.getElementById('locationInput').value;
            locations.push(location);
            document.getElementById('locationInput').value = '';
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
