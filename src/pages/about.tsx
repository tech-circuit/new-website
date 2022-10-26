import clsx from 'clsx';
import { useState } from 'react';
import { FaChevronDown, FaLongArrowAltRight } from 'react-icons/fa';
import { Chatbox } from '../components/chatbox';
import { faqs } from '../data/faq';
import { members } from '../data/members';

type FaqProps = {
  question: string;
  answer: string;
};

function Faq({ question, answer }: FaqProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx('faq')}>
      <FaChevronDown
        className={clsx('faq-toggle', isOpen && 'faq-toggle-active')}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className="q">{question}</div>
      <div className={clsx('a', isOpen && 'a-active')}>{answer}</div>
    </div>
  );
}

export default function About() {
  const [isChatboxOpen, setChatboxOpen] = useState(false);

  return (
    <>
      <Chatbox isChatboxOpen={isChatboxOpen} setChatboxOpen={setChatboxOpen} />
      <div className="container abt-hero">
        <img src="/assets/fulllogo.png" alt="logo" />
        <h3>The place where everything takes place</h3>
        <p>
          We’re a team of developers, designers and technology lovers who have
          all experienced our own difficulties when trying to build a better
          understanding of the tech circuit in general. While we believe we live
          in an era full of opportunity and resources, much of it remains
          challenging to a lot of students to access. Given our abundant and
          constant access to valuable resources, we felt that we should do out
          part in helping fellow tech enthusiasts.
          <br />
          <br />
          Since long, the{' '}
          <u>tech community has lacked a centralised platform</u>, using which
          people can connect, share their creative work and get feedback, and
          participate in events. techCircuit aims to solve all of these
          problems.
        </p>
      </div>

      <section id="abt" className="about about-abt">
        <div className="abt-left">
          <div className="container">
            <h1>A bit of background</h1>
            <p>
              Over the past 20 years, in the Delhi-NCR region of India (where
              our founding team is from), an ecosystem of tech clubs and
              symposiums has been formed, commonly referred to as the Tech
              Circuit. Here’s how it works - every institute has a tech club
              with a unique identity; they host and participate in all kinds of
              events related to tech, members grow their skills across various
              fields of tech (design. Development, etc), recruit and guide
              juniors, build cool stuff and grow their network by collaborating
              with or competing against like-minded students.
              <br />
              <br />
              This ecosystem inspired the creation of techCircuit. We realized
              that there was no common platform where all this activity could
              take place, limiting the recognition many organizations or
              creators could attain.
              <br />
              <br />
              We aim to provide a platform and place for just that. We also want
              to expand this network beyond our place of origin and potentially
              create a circuit that spans the entire world.
            </p>
          </div>
        </div>
        <div className="abt-right">
          <div className="circ-hold">
            <div id="circ-1" className="circ">
              <img src="/assets/circ-1.svg" alt="circ" />
            </div>
            <div id="circ-2" className="circ">
              <img src="/assets/circ-2.svg" alt="circ" />
            </div>
            <div id="circ-3" className="circ">
              <img src="/assets/circ-3.svg" alt="circ" />
            </div>
            <div id="circ-4" className="circ">
              <img src="/assets/circ-4.svg" alt="circ" />
            </div>
            <div id="circ-5" className="circ">
              <img src="/assets/circ-5.svg" alt="circ" />
            </div>
            <div id="circ-6" className="circ">
              <img src="/assets/circ-6.svg" alt="circ" />
            </div>
          </div>
        </div>
      </section>

      <div className="why container about-why">
        <div className="why-top">
          <h1>Why we built techCircuit</h1>
          <p>
            Being members of some of the most popular tech clubs in India, we
            have come across a number of problems during the time we’ve spent as
            a part of the Delhi Tech Circuit. We resoluted to build a platform,
            which would eradicate such stumbling blocks for tech enthusiasts
            around the world.
          </p>
        </div>
        <div className="why-bot">
          <h3>
            techCircuit aims to bridge the gap between professionals and
            beginners across multiple tech fields.
          </h3>
        </div>
      </div>

      <div className="reviews">
        <div className="review">
          <div className="review-left">
            <img src="/assets/ishana.jpg" alt="ishana" />
            <h2>Ishaan Das</h2>
            <h3>Co-Founder Director</h3>
          </div>
          <div className="review-content">
            <p>
              Having been an active participant in the Delhi-NCR tech community
              for four years, I feel that the problems we plan to solve with
              techCircuit are ones everyone has faced at some point during their
              endeavors. All we’re doing is trying to organize this whole system
              that we’ve been a part of for so long, to make the experience
              smoother for everyone to provide way more people an opportunity to
              be a part of this community.
            </p>
          </div>
        </div>

        <div className="review">
          <div className="review-left">
            <img src="https://github.com/laxyapahuja.png" alt="laxy" />
            <h2>Laxya Pahuja</h2>
            <h3>Co-Founder Director</h3>
          </div>
          <div className="review-content">
            <p>
              The number of tech organizations in India was increasing
              exponentially. We knew that a separate entity that recognizes
              these clubs and more organizations from all over India and gives
              them opportunities on a wider scale was very much needed. So, we
              made one.
            </p>
          </div>
        </div>
      </div>

      <div className="faqs-cont container">
        <h1>Frequently Asked Questions</h1>
        <div className="faqs">
          {faqs.map(faq => (
            <Faq key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
        <h2>Got more Questions?</h2>
        <button className="btn" onClick={() => setChatboxOpen(false)}>
          Leave us a Message!&nbsp;&nbsp;
          <FaLongArrowAltRight />
        </button>
      </div>

      <div className="member-cont container">
        <h1>Team behind techCircuit</h1>
        <div className="big-members">
          <div className="big-member member">
            <img src="/assets/ishana.jpg" alt="Ishaan Das" />
            <h3>Ishaan Das</h3>
            <h4>Co-Founder Director</h4>
          </div>
          <div className="big-member member">
            <img src="https://github.com/laxyapahuja.png" alt="Laxya Pahuja" />
            <h3>Laxya Pahuja</h3>
            <h4>Co-Founder Director</h4>
          </div>
        </div>
        <div className="members">
          {members.map(({ name, image, position }) => (
            <div className="member" key="name">
              <img src={image} alt={name} />
              <h3>{name}</h3>
              <h4>{position}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
