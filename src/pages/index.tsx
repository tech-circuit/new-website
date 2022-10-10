import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { FaCheck, FaChevronDown, FaCommentAlt } from 'react-icons/fa';
import { z } from 'zod';
import AOS from 'aos';

function Typewriter() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const textArray = [
    'everything',
    'coding',
    'designing',
    'hacking',
    'networking',
    'vibing',
  ];
  const typingDelay = 80;
  const eraseDelay = 30;
  const newTextDelay = 2000;

  useEffect(() => {
    let textArrayIndex = 0;
    let charIndex = 10;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const cursor = cursorRef.current!;
    const title = titleRef.current!;

    const type = () => {
      if (charIndex < textArray[textArrayIndex]!.length) {
        if (!cursor.classList.contains('cursorActive'))
          cursor.classList.add('cursorActive');
        title.textContent += textArray[textArrayIndex]!.charAt(charIndex);
        charIndex++;
        timeout = setTimeout(type, typingDelay);
      } else {
        cursor.classList.remove('cursorActive');
        timeout = setTimeout(erase, newTextDelay);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        if (!cursor.classList.contains('cursorActive'))
          cursor.classList.add('cursorActive');
        title.textContent = textArray[textArrayIndex]!.substring(
          0,
          charIndex - 1
        );
        charIndex--;
        timeout = setTimeout(erase, eraseDelay);
      } else {
        cursor.classList.remove('cursorActive');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
          textArrayIndex = 0;
        }
        timeout = setTimeout(type, typingDelay + 1100);
      }
    };

    timeout = setTimeout(erase, 3000);

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <span id="title" ref={titleRef}>
        everything
      </span>
      <div ref={cursorRef} className="cursor" />
    </>
  );
}

const emailSchema = z.string().email('Please enter a valid email.');

function MailForm() {
  const handleMailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    const emailData = emailSchema.safeParse(email);

    if (!emailData.success) {
      // notyf.open({
      //   type: 'error',
      //   message: 'Please enter a valid email.',
      // });
    } else {
      // fetch(`/ml/subscribe`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     email: emailData.data,
      //   }),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // })
      //   .then(response => {
      //     // console.log(response.success);
      //     e.currentTarget.reset();
      //     // notyf.open({
      //     //   type: 'success',
      //     //   message: 'Joined successfully!',
      //     // });
      //   })
      //   .catch(error => console.log(error));
    }
  };

  return (
    <form className="mail" onSubmit={handleMailSubmit}>
      <div className="input">
        <Image src="/assets/mail.svg" alt="" width={25} height={20} />
        <input name="email" type="text" placeholder="Email Address" />
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}

function ContactForm() {
  const [sendButton, setSendButton] = useState(true);
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const message = formData.get('message');
    const emailData = emailSchema.safeParse(email);

    if (!emailData.success) {
      // return notyf.open({
      //    type: 'error',
      //    message: 'Please enter a valid email.',
      //  });
    }

    if (message === '') {
      // return
    }

    e.currentTarget.reset();
    setSendButton(false);
    setTimeout(() => setSendButton(true), 1000);
  };

  return (
    <form onSubmit={handleContactSubmit}>
      <div className="input">
        <img src="/assets/mail.svg" id="c-im" alt="alt" />
        <input type="text" name="email" placeholder="Email Address" />
      </div>
      <textarea
        className="message"
        name="message"
        placeholder="Type your message here!"
      />
      {sendButton === true ? (
        <button type="submit" className="contact-btn">
          Send
        </button>
      ) : (
        <button disabled>
          <FaCheck />
        </button>
      )}
    </form>
  );
}

type ChatboxProps = {
  isChatboxOpen: boolean;
  setChatboxOpen: React.Dispatch<boolean>;
};

function Chatbox({ isChatboxOpen, setChatboxOpen }: ChatboxProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* layer exists to close modal on click outside  */}
      {isChatboxOpen && (
        <div
          ref={layerRef}
          onClick={() => setChatboxOpen(false)}
          className="msg-opaq-layer msg-opaq-layer-active"
        />
      )}
      <div className="msg" onClick={() => setChatboxOpen(!isChatboxOpen)}>
        <FaChevronDown
          className="backIcon"
          style={
            isChatboxOpen
              ? {
                  transform: 'scale(1) rotate(0deg) translateX(50%)',
                  opacity: '1',
                }
              : {
                  transform: 'scale(0.5) rotate(45deg) translateX(50%)',
                  opacity: '0',
                }
          }
        />
        <FaCommentAlt
          style={
            isChatboxOpen
              ? {
                  transform: 'scale(0.5) rotate(-45deg) translateX(-50%)',
                  opacity: '0',
                }
              : {
                  transform: 'scale(1) rotate(0deg) translateX(-50%)',
                  opacity: '1',
                }
          }
          className="commentIcon"
        />
      </div>
      <div
        style={
          isChatboxOpen
            ? {
                transform: 'scale(1)',
                opacity: '1',
                pointerEvents: 'all',
              }
            : {
                transform: 'scale(0.5)',
                opacity: '0',
                pointerEvents: 'none',
              }
        }
        className="contact-card"
      >
        <h1>Leave us a message!</h1>
        <ContactForm />
      </div>
    </>
  );
}

function useAOS() {
  useEffect(() => {
    console.log('init');
    AOS.init({
      once: true,
      duration: 600,
      delay: 100,
    });
    AOS.refresh();
  }, []);
}

export default function Home() {
  const [isChatboxOpen, setChatboxOpen] = useState(false);

  useAOS();

  return (
    <main style={{ position: 'relative' }}>
      <Chatbox isChatboxOpen={isChatboxOpen} setChatboxOpen={setChatboxOpen} />
      <section className="hero">
        <div className="hero-left">
          <div className="container">
            <h1>
              The place where
              <br />
              <Typewriter />
              &nbsp;takes place.
            </h1>
            <p data-aos="fade-right" data-aos-delay="200">
              Join our mailing list to be notifed about the latest updates on
              techCircuit, get information about events, and to be the first to
              know when our web platform launches!
            </p>
            <MailForm />
            <a
              data-aos="fade-up"
              data-aos-delay="300"
              href="https://dsc.gg/techcircuit"
              className="hero-btn"
              target="_blank"
              rel="noreferrer"
            >
              Join Discord Server &nbsp;&nbsp;
              <Image
                src="/assets/Right_Arrow.svg"
                height={12}
                width={16}
                alt=""
              />
            </a>
            <div className="scroll-more-hold">
              <a href="#abt" className="scroll-more">
                Scroll to know more
              </a>
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div className="hero-right">
          <Image
            src="/assets/hero.svg"
            height={500}
            width={600}
            alt="Hero Banner"
          />
        </div>
      </section>

      <section id="abt" className="about">
        <div className="abt-left">
          <div className="container">
            <h1 data-aos="fade-right">What is techCircuit?</h1>
            <p data-aos="fade-right" data-aos-delay="300">
              This is a place where a community of technology enthusiast
              students and individuals can network, get feedback on projects,
              and participate in and host events, and gain access to curated
              educational resources for numerous fields in the realm of
              technology, design, entrepreneurship, and more.
              <br />
              <br />
              Tech Circuit (techCircuit) is a{' '}
              <i>
                <strong>community of high school and college students</strong>
              </i>
              passionate about numerous various domains of technology, ranging
              from{' '}
              <i>
                <strong>computer science to digital design</strong>
              </i>
              . It is the place to be to connect and network with like minded
              tech enthusiasts, share your projects with the community, and to
              promote your *hackathons* and events independently or through your
              school/university or club.
            </p>
            <Image
              src="/assets/abt.svg"
              alt="About Banner"
              height={550}
              width={600}
            />
            <p className="illuBy">
              Illustrations by{' '}
              <a
                href="https://linktr.ee/tiyabosht"
                target="_blank"
                rel="noreferrer"
              >
                Paridhi Bisht
              </a>
            </p>
          </div>
        </div>
        <div className="abt-right">
          <div className="circ-hold">
            <div id="circ-1" className="circ">
              <Image src="/assets/circ-1.svg" height={70} width={70} alt="" />
            </div>
            <div id="circ-2" className="circ">
              <Image src="/assets/circ-2.svg" height={70} width={70} alt="" />
            </div>
            <div id="circ-3" className="circ">
              <Image src="/assets/circ-3.svg" height={70} width={70} alt="" />
            </div>
            <div id="circ-4" className="circ">
              <Image src="/assets/circ-4.svg" height={70} width={70} alt="" />
            </div>
            <div id="circ-5" className="circ">
              <Image src="/assets/circ-5.svg" height={70} width={70} alt="" />
            </div>
            <div id="circ-6" className="circ">
              <Image src="/assets/circ-6.svg" height={70} width={70} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="feats">
        <div className="clubs container">
          <div className="club-left">
            <h2 data-aos="fade-right">
              Home to the most influential
              <br />
              tech clubs from all over India.
            </h2>
            <p data-aos="fade-right" data-aos-delay="400">
              The biggest names in the Indian Tech Circuit, including Exun, CW,
              TS and more have tested and approved of the features that
              techCircuit offers.
            </p>
          </div>
          <div className="club-right">
            <div className="club-logos">
              <Image
                data-aos="zoom-in"
                src="/assets/exun.png"
                height={125}
                width={125}
                alt=""
                className="club-logo"
              />
              <Image
                data-aos="zoom-in"
                data-aos-delay="200"
                src="/assets/cw.jpeg"
                height={125}
                width={125}
                alt=""
                className="club-logo"
              />
              <Image
                data-aos="zoom-in"
                data-aos-delay="300"
                height={125}
                width={125}
                src="/assets/ts.png"
                alt=""
                className="club-logo"
                style={{ backgroundColor: '#0E0C0C' }}
              />
            </div>
          </div>
        </div>

        <div className="feat container first-feat">
          <div className="feat-banner">
            <Image
              className="feat-img-minus"
              src="/assets/land1.svg"
              height={350}
              width={500}
              alt=""
            />
          </div>
          <div className="feat-content">
            <h2 data-aos="fade-left">Showcase your work and skills!</h2>
            <p data-aos="fade-left" data-aos-delay="300">
              techCircuit serves as a platform for individuals with varying
              skillsets, ranging from code to design, to show off their projects
              to the tech community. Users can upvote, share and comment on
              posts, making the community a positive and friendly space.
              techCircuit’s easy to use filters let users navigate through
              projects effortlessly.
            </p>
          </div>
        </div>
        <div className="feat container">
          <div className="feat-content">
            <h2 data-aos="fade-right">Browsing events made easier for you!</h2>
            <p data-aos="fade-right" data-aos-delay="300">
              We strive to provide the ideal platform for people to host and
              promote their hackathons, designathons and tech symposiums, and
              coordinate schedules to avoid conflicts.
            </p>
          </div>
          <div className="feat-banner">
            <Image src="/assets/land2.svg" height={400} width={500} alt="" />
          </div>
        </div>
        <div className="feat container">
          <div className="feat-banner">
            <Image src="/assets/land3.svg" height={450} width={450} alt="" />
          </div>
          <div className="feat-content">
            <h2 data-aos="fade-left">
              Meet. Share. Discuss. Welcome to Community of creators!
            </h2>
            <p data-aos="fade-left" data-aos-delay="300">
              techCircuit has a friendly and really helpful community which aims
              to ultimately help everyone benefit from the platform. Creators
              can get feedback on their projects, tech enthusiasts can sign up
              for events, and organizations can promote their events. The
              techCircuit forum also serves as a place for healthy discussion
              amongst people interested in tech.
            </p>
          </div>
        </div>
        <div className="feat container">
          <div className="feat-content">
            <h2 data-aos="fade-right">
              Curated crowdsourced resources for all fields!
            </h2>
            <p data-aos="fade-right" data-aos-delay="300">
              techCircuit also features learning resources for various
              tech-related fields, including Design, A/V, Software Development,
              Cryptic Hunts and more; to which members of the community can
              contribute.
            </p>
          </div>
          <div className="feat-banner">
            <Image
              // className="feat-img-plus"
              src="/assets/land5.svg"
              height={350}
              width={350}
              alt=""
              id="not-final-img"
            />
          </div>
        </div>
        <div className="feat container">
          <div className="feat-banner">
            <Image src="/assets/land4.svg" height={300} width={450} alt="" />
          </div>
          <div className="feat-content">
            <h2 data-aos="fade-left">
              Place to discuss your interests & projects with everyone!
            </h2>
            <p data-aos="fade-left" data-aos-delay="300">
              Our forum provides a place for the tech community to discuss their
              interests or projects, promote content, and share their views on
              technology-related topics.
            </p>
          </div>
        </div>
        <div className="feat last-feat container">
          <div className="feat-content">
            <h2 data-aos="fade-right">
              Home to student clubs and organizations!
            </h2>
            <p data-aos="fade-right" data-aos-delay="300">
              techCircuit aims to provide a unified platform for school and
              college tech clubs and organizations to connect and host events.
            </p>
          </div>
          <div className="feat-banner">
            <Image src="/assets/land6.svg" height={300} width={500} alt="" />
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </main>
  );
}
