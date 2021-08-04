import React, { useState } from "react";

import Button from "../button";
import styles from "./About.module.css";

export default function About() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle && (
        <div className={styles.aboutContainer}>
          <div className={styles.aboutContent}>
            <div className={styles.infoWrapper}>
              <p>
                Potato Exchange is a social platform for chatting with other
                users while queueing for an opportunity to chat 1:1 with the
                meeting host.
              </p>
              <div className={styles.skillsWrapper}>
                <h1
                  className={styles.infoHeaders}
                  className={styles.infoHeaders}
                >
                  Skills
                </h1>
                <ul>
                  <li>JavaScript</li>
                  <li>Python</li>
                  <li>Express</li>
                  <li>Flask</li>
                  <li>React/Redux</li>
                  <li>HTML/CSS</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>
              <div className={styles.projectsWrapper}>
                <h1 className={styles.infoHeaders}>Projects</h1>
                <li>
                  <a
                    className={styles.pageLinks}
                    href="https://catsyapp.herokuapp.com/"
                  >
                    Catsy
                  </a>
                </li>
                <li>
                  <a
                    className={styles.pageLinks}
                    href="https://linkshell.herokuapp.com/"
                  >
                    Linkshell
                  </a>
                </li>
                <li>
                  <a
                    className={styles.pageLinks}
                    href="http://ggs---app.herokuapp.com/"
                  >
                    GoodGames
                  </a>
                </li>
              </div>
              <div className={styles.hobbiesWrapper}>
                <h1 className={styles.infoHeaders}>Hobbies</h1>
                <ul>
                  <li>Fishing</li>
                  <li>Cooking</li>
                  <li>Video Games</li>
                  <li>Anime</li>
                  <li>Guitar</li>
                  <li>Crocheting</li>
                </ul>
              </div>
              <div className={styles.contactWrapper}>
                <h1 className={styles.infoHeaders}>Contact</h1>
                <ul>
                  <li>Wilson Huang</li>
                  <li>
                    <a className={styles.pageLinks} href="tel:9167693015">
                      (916) 769-3015
                    </a>
                  </li>
                  <li>
                    <a
                      className={styles.pageLinks}
                      href="mailto:whuang3015@gmail.com?subject=Hi, I'm reaching out from Potato Exchange!"
                    >
                      whuang3015@gmail.com
                    </a>
                  </li>
                </ul>
                <div className={styles.socialsWrapper}>
                  <Button
                    action={() =>
                      (window.location.href =
                        "https://www.linkedin.com/in/wilson-huang-39198039/")
                    }
                    paddingY={30}
                    paddingX={30}
                    width={30}
                    // height={""}
                    borderRadius={51}
                    btnColor={"black"}
                    text={<i className="fab fa-linkedin"></i>}
                    fontColor={""}
                    fontSize={""}
                  />
                  <Button
                    action={() =>
                      (window.location.href =
                        "https://github.com/PotatoAim11518/potato_exchange")
                    }
                    paddingY={30}
                    paddingX={30}
                    width={30}
                    height={""}
                    borderRadius={51}
                    btnColor={"black"}
                    text={<i className="fab fa-github"></i>}
                    fontColor={""}
                    fontSize={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.toggleButtonContainer}>
        {toggle && (
          <div className={styles.toggleButtonX}>
            <Button
              action={() => setToggle(!toggle)}
              paddingY={30}
              paddingX={30}
              width={30}
              height={""}
              borderRadius={51}
              btnColor={"black"}
              text={<i className="fas fa-times"></i>}
              // fontColor={""}
              fontSize={""}
            />
          </div>
        )}
        {!toggle && (
          <div className={styles.toggleButtonQ}>
            <Button
              action={() => setToggle(!toggle)}
              paddingY={30}
              paddingX={30}
              width={30}
              height={""}
              borderRadius={51}
              btnColor={"black"}
              text={<i className="fas fa-question"></i>}
              fontColor={""}
              fontSize={""}
            />
          </div>
        )}
      </div>
    </>
  );
}
