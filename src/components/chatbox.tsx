import { useRef, useState } from 'react';
import { FaCheck, FaChevronDown, FaCommentAlt } from 'react-icons/fa';
import { emailSchema } from '../utils/validation';

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

export function Chatbox({ isChatboxOpen, setChatboxOpen }: ChatboxProps) {
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
