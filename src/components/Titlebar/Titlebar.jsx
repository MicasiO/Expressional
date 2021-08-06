import React, { useState, useEffect } from "react";
import PopupModal from "../PopupModal/PopupModal";
import logo from "../../assets/logos/logo-inverted.png";

const { remote } = window.require("electron");
const AutoLaunch = window.require("auto-launch");

const autoLauncher = new AutoLaunch({
  name: "Expressional",
});

const Titlebar = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [autoLaunchEnabled, setAutoLaunchEnabled] = useState(false);

  const win = remote.getCurrentWindow();

  const openSettingsModal = () => {
    setSettingsModalIsOpen(!settingsModalIsOpen);
  };

  const toggleAutoLaunch = (event) => {
    setAutoLaunchEnabled(!autoLaunchEnabled);
    autoLauncher
      .isEnabled()
      .then(() => {
        event.target.checked ? autoLauncher.enable() : autoLauncher.disable();
      })
      .catch((err) => {
        throw err;
      });
  };

  const minimizeWindow = () => {
    win.minimize();
  };

  const closeWindow = () => {
    win.close();
  };

  useEffect(() => {
    autoLauncher
      .isEnabled()
      .then((isEnabled) => {
        setAutoLaunchEnabled(isEnabled);
        console.log(isEnabled);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <React.Fragment>
      <header id="titlebar">
        <div id="drag-region">
          <div id="window-title">
            <span>Expressional</span>
          </div>
          <div id="window-controls">
            <div
              className="button"
              id="settings-button"
              onClick={openSettingsModal}
            >
              <i className="icon bi bi-gear"></i>
            </div>
            <div className="button" id="min-button" onClick={minimizeWindow}>
              <img
                className="icon"
                alt=""
                srcSet="
                titlebar-assets/min-w-10.png 1x,
                titlebar-assets/min-w-12.png 1.25x,
                titlebar-assets/min-w-15.png 1.5x,
                titlebar-assets/min-w-15.png 1.75x,
                titlebar-assets/min-w-20.png 2x,
                titlebar-assets/min-w-20.png 2.25x,
                titlebar-assets/min-w-24.png 2.5x,
                titlebar-assets/min-w-30.png 3x,
                titlebar-assets/min-w-30.png 3.5x
              "
                draggable="false"
              />
            </div>

            <div className="button" id="restore-button">
              <img
                className="icon"
                alt=""
                srcSet="
                titlebar-assets/restore-w-10.png 1x,
                titlebar-assets/restore-w-12.png 1.25x,
                titlebar-assets/restore-w-15.png 1.5x,
                titlebar-assets/restore-w-15.png 1.75x,
                titlebar-assets/restore-w-20.png 2x,
                titlebar-assets/restore-w-20.png 2.25x,
                titlebar-assets/restore-w-24.png 2.5x,
                titlebar-assets/restore-w-30.png 3x,
                titlebar-assets/restore-w-30.png 3.5x
              "
                draggable="false"
              />
            </div>

            <div className="button" id="close-button" onClick={closeWindow}>
              <img
                className="icon"
                alt=""
                srcSet="
                titlebar-assets/close-w-10.png 1x,
                titlebar-assets/close-w-12.png 1.25x,
                titlebar-assets/close-w-15.png 1.5x,
                titlebar-assets/close-w-15.png 1.75x,
                titlebar-assets/close-w-20.png 2x,
                titlebar-assets/close-w-20.png 2.25x,
                titlebar-assets/close-w-24.png 2.5x,
                titlebar-assets/close-w-30.png 3x,
                titlebar-assets/close-w-30.png 3.5x
              "
                draggable="false"
              />
            </div>
          </div>
        </div>
      </header>
      <PopupModal
        title="Settings"
        on={settingsModalIsOpen}
        setOn={setSettingsModalIsOpen}
      >
        <div className="settings-row">
          <p>Start on system boot</p>
          <label className="switch">
            <input
              type="checkbox"
              id="auto-launch-toggle"
              onClick={toggleAutoLaunch}
              checked={autoLaunchEnabled}
              readOnly
            />
            <span className="slider round"></span>
          </label>
        </div>
      </PopupModal>
    </React.Fragment>
  );
};

export default Titlebar;
