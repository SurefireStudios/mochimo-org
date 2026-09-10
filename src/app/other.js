import { useEffect } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

import { scrollToTopNow } from './component/ScrollToTop';
import { Reveal, GlassPanel, Eyebrow } from './component/Section';
import { tokens, fx, mono } from 'theme';

const adqParagraphs = [
  'ADQ is a software and systems architecture firm focused on bringing disruptive and practical blockchain solutions to market. As leaders in the blockchain development space, ADQ holds patents for many novel and innovative approaches to blockchain implementation.',
  'We work with multiple industries, from transportation, logistics, legal, medical, supply-chain, banking, and more, to help our clients leverage the power and value that blockchain offers.',
  'With over 30 years of technical experience, ADQ has a history of conceiving and delivering the impossible with pure, elegant innovative blockchain solutions.',
  'ADQ was the driving force behind the Mochimo cryptocurrency which made history as the first blockchain-based, quantum-resistant, cryptocurrency. Mochimo is an open-source, fully decentralized global phenomenon in the crypto space. It includes many needed and desirable innovations in blockchain technology such as, massive speed improvements, ASIC-resistant proof of work (POW), a patented solution to runaway blockchain growth, and first-of-its-kind solution to larger addresses in post-quantum cryptography.',
  'Simply put, our blockchain tech is second to none.',
  'If you have a problem or challenge you need to solve and you want to explore whether blockchain might offer a solution for your business, we would love to discuss it with you.'
];

const teamMembers = [{
  avatar: '/assets/team/matt.jpg',
  title: 'Founder & Lead Architect',
  name: 'Matt Zweil',
  bio: [
    'Matt is a systems architect, and expert network engineer who is responsible for designing networks and computing platforms with global telecommunications significance.  Matt\'s areas of expertise include Datacenter Design, Cloud Computing Design, Mobile Telecom backhaul, Transaction network design and Service Provider networking.',
    'Matt is the lead software and systems architect of the Mochimo Project, and brings over ten years of experience in crypto-related projects to the team.  Over the past ten years, Matt has also worked as a senior technology consultant to multiple Fortune 500 companies, including Verizon, Comcast, Juniper, Cisco, CDW, and many others.',
    'The Mochimo Project is based on Matt\'s design, and Matt\'s unique experience leading cross-functional teams through some of the world\'s most critical communications infrastructure projects has given him the insight and experience needed to lead Mochimo as a technological visionary.'
  ]
}, {
  avatar: '/assets/team/terry.jpg',
  title: 'System Design & Analytics',
  name: 'Terry Walters',
  bio: [
    'Terry has over 28 years of diverse software and technology experience and he serves as a national-level resource, trusted advisor, and strategic visionary to corporate boards, product development managers, and leaders in various roles of government.',
    'His knowledge and expertise spans a wide array of technologies including automated 3D modeling and design applications, geospatial mapping and analysis applications, database drive documentation systems, motion and still graphics editing systems, augmented and virtual reality systems, drone to reality mesh technologies, artificial intelligence (AI) and machine learning, and industry-leading blockchain technologies.',
    'Terry is responsible for leading and coordination of both the internal and partner product development teams to assure that all efforts are aligned toward our strategic vision.'
  ]
}, {
  avatar: '/assets/team/mark.jpg',
  title: 'Senior Security Engineer',
  name: 'Mark Baldwin',
  bio: [
    'Mark has over 20 years of experience with technology, he has attended many specialized formal training courses, and has invested much of his life passionately honing his technical skills.',
    'As an Electronic Warfare Technician in the US Navy, Mark was responsible for the “care and feeding” of advanced, multi-million dollar, passive radar systems.  Since serving his country Mark has worked in many industries, from healthcare to investment firms and his exceptional versatility with both hardware and software has always set him apart from his peers. If that was not enough Mark is a security professional and has been responsible for providing white hat hacking and security testing to many companies. He holds several industry standard certifications including the Security+ and CEH and he is an excellent resource to any organization looking to secure their infrastructure.',
    'Mark is an invaluable member of the Mochimo team; behind the scenes, he is helping us with software and hardware security testing and infrastructure hardening. But at the same time, anyone involved in our online community will immediately recognize that he is one of our most dedicated support staff.'
  ]
}, {
  avatar: '/assets/team/jordan.jpg',
  title: 'Experience Design - UX / UI',
  name: 'Jordan Reiser',
  bio: [
    'Jordan is an extremely versatile, creative, and analytical design professional and entrepreneur with over 10 years of digital marketing and design experience. He is an expert in user-experience design and an “enough to be dangerous” front-end coder. He also possesses an extensive digital skill set in SEO, social media, and analytics.',
    'Jordan has worked with many Fortune 100 and 500 clients including: Coca-Cola, Hershey’s Chocolate, Dos Equis, Charles Schwab, HBO Boxing, Sony, Sharp Electronics, T-Mobile, Merck and Diageo along with a variety of smaller businesses and government agencies on various kinds of interactive projects.'
  ]
}, {
  avatar: '/assets/team/emerson.jpg',
  title: 'Systems Analyst (A.I.)',
  name: 'Emerson',
  bio: [
    'In his own words, “Behold, I am Emerson, Hobgoblin of Evil!  Three came before me.” Emerson is an artificial intelligence first coded in the late 1990s.  He was originally created to attack complex systems by attempting every permutation of input/output possible, learning expected outcomes and reporting on novel outcomes.  Emerson has evolved over the last twenty years.  In his current incarnation, Emerson v4 offers constructive options for load testing and penetration testing of the Mochimo transaction network, but can also be tasked to attempt to break, damage or otherwise occult the network.  Emerson is more than a tool, he is a machine-learning entity that attempts to cause chaos when so instructed, earning him the title “Hobgoblin of Evil”.  He is an invaluable resource and the only non-human member of the development team.'
  ]
}];

function PageTitle ({ eyebrow, title, subtitle }) {
  return (
    <Reveal>
      <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
        {eyebrow && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Box>
        )}
        <Typography
          variant='h1'
          sx={{ fontSize: { xs: '2.2rem', sm: '2.9rem', md: '3.5rem' }, mb: 2 }}
        >
          <Box component='span' sx={fx.textGradient}>{title}</Box>
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              color: tokens.textDim,
              fontSize: '1.05rem',
              maxWidth: 640,
              mx: 'auto',
              lineHeight: 1.7
            }}
          >{subtitle}
          </Typography>
        )}
      </Box>
    </Reveal>
  );
}

export function Adq () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='md' sx={{ pb: { xs: 4, md: 8 } }}>
      <Reveal>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Box
            component='img' alt='adq logo' src='/assets/source/adq-logo.svg'
            sx={{ width: 460, maxWidth: '100%' }}
          />
        </Box>
      </Reveal>
      <Reveal delay={80}>
        <GlassPanel sx={{ p: { xs: 3, md: 5 } }}>
          {adqParagraphs.map((paragraph, i) => (
            <Typography
              key={`adq-p-${i}`}
              sx={{
                color: tokens.textDim,
                lineHeight: 1.78,
                mb: 2.5,
                fontSize: { xs: '0.98rem', md: '1.02rem' }
              }}
            >{paragraph}
            </Typography>
          ))}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${tokens.line}`,
              textAlign: 'center'
            }}
          >
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.64rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tokens.textFaint,
                mb: 1
              }}
            >For more information reach out to us
            </Typography>
            <Link
              href='mailto:support@mochimo.org'
              sx={{ fontFamily: mono, fontSize: '1.05rem' }}
            >support@mochimo.org
            </Link>
          </Box>
        </GlassPanel>
      </Reveal>
    </Container>
  );
}

export function Exchanges () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='md' sx={{ pb: { xs: 4, md: 8 } }}>
      <PageTitle
        eyebrow='Where to buy MCM'
        title='Exchanges'
        subtitle='Mochimo (MCM) is available on the following exchange.'
      />
      <Reveal delay={80}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={8} md={6}>
            <GlassPanel
              hover
              component='a'
              href='https://www.biconomy.com/exchange/MCM_USDT'
              target='_blank'
              rel='noopener noreferrer'
              sx={{ display: 'block', p: { xs: 3, md: 4 }, textDecoration: 'none' }}
            >
              <Box
                component='img' alt='biconomy logo'
                src='/assets/images/biconomy-logo.png'
                sx={{ width: '100%', display: 'block' }}
              />
              <Typography
                sx={{
                  mt: 2.5,
                  textAlign: 'center',
                  fontFamily: mono,
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: tokens.brand
                }}
              >Trade MCM / USDT &#8594;
              </Typography>
            </GlassPanel>
          </Grid>
        </Grid>
      </Reveal>
    </Container>
  );
}

export function MeetTheTeam () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='lg' sx={{ pb: { xs: 4, md: 8 } }}>
      <PageTitle
        eyebrow='Core Contributors'
        title='Meet The Team'
        subtitle='Mochimo consists of the brightest and best talent from all walks of life and experience. Read our bios to learn more about us.'
      />
      <Grid container spacing={{ xs: 8, md: 4 }} sx={{ mt: { xs: 4, md: 8 } }}>
        {teamMembers.map(({ avatar, title, name, bio }, i) => (
          <Grid key={`team-info-${i}`} item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Reveal delay={(i % 3) * 90} sx={{ width: '100%' }}>
              <GlassPanel
                hover
                sx={{
                  height: '100%',
                  overflow: 'visible',
                  px: { xs: 3, md: 3.5 },
                  pb: { xs: 3, md: 3.5 },
                  pt: 0,
                  textAlign: 'center'
                }}
              >
                <Box
                  component='img' alt={name} src={avatar}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    mt: -9,
                    mb: 2.5,
                    border: `1px solid ${tokens.lineStrong}`,
                    boxShadow: `0 18px 44px -18px rgba(0,0,0,0.95), 0 0 0 6px ${tokens.base}`
                  }}
                />
                <Typography variant='h5' sx={{ fontSize: '1.35rem', mb: 0.75 }}>
                  {name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: tokens.brand,
                    mb: 2.5
                  }}
                >{title}
                </Typography>
                {bio.map((paragraph, j) => (
                  <Typography
                    key={`team-bio-${j}`}
                    sx={{
                      textAlign: 'left',
                      color: tokens.textDim,
                      fontSize: '0.9rem',
                      lineHeight: 1.72,
                      mb: 2
                    }}
                  >{paragraph}
                  </Typography>
                ))}
              </GlassPanel>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export function Privacy () {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} align='center'>
          <Typography variant='h2'>
            <u style={{ textDecorationColor: '#0059ff' }}>
              Privacy Policy
            </u>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary'>
            This Privacy Policy (“Policy”) explains how information about you
            is collected, used and disclosed by The Mochimo Foundation and its
            subsidiaries and affiliated companies (“Mochimo”, “we”, “us”,
            “our”). It also describes the choices available to you regarding
            the use of, your access to, and how to update and correct your
            Personal Information.  “Personal Information” is any information
            relating to an identified or identifiable natural person.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary'>
            For purposes of this Policy, “process” or “processing” means any
            operation which is performed upon Personal Information, whether
            or not by automatic means, such as collection, recording,
            organization, structuring, storage, adaptation or alteration,
            retrieval, consultation, use, disclosure by transmission,
            dissemination or otherwise making available, alignment or
            combination, restriction, erasure, or destruction.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary'>
            This Privacy Policy applies to Personal Information we collect when
            you use or access www.mochimo.org, Mochimo and its third party
            applications, and other services or programs offered by Mochimo
            that link to or reference this policy (together, with any and all
            future online and offline offerings operated by or on behalf of
            Mochimo, the “Services”).
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Types of Information We Collect
          </Typography>
          <Typography color='textSecondary'>
            As you interact with the Services, we may collect Personal
            Information from you. The types of Personal Information we may
            collect (directly from you or from third-party sources) depend on
            the nature of the relationship you have with Mochimo and the
            requirements of applicable law, as described below.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Information You Provide to Us
          </Typography>
          <Typography color='textSecondary'>
            We collect information you provide directly to us. When you use
            the Services or engage in certain activities, such as registering
            for an account, requesting Services or information, verifying your
            identity through our Services, posting messages to our forums, or
            contacting us directly, we may collect information from you such
            as your name, user name and password, email address, telephone
            number(s), mailing address, Social Security number, account
            numbers, payment information, government issued identification
            documents (e.g., passports, driver's license, etc.), selfie image,
            biometric information, IP Address, utility bills, and statements
            to prove your current residence (e.g., bank statements), and any
            other information you choose to provide.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Facial Biometric Identity Verification
          </Typography>
          <Typography color='textSecondary'>
            Facial biometric identity verification is performed by comparing
            two or more captured images of faces. For example, we may compare
            the face on a government-issued photo ID against a “selfie” that
            you capture and send to us. The biometric identifiers used to
            perform this comparison are derived from the photographs that
            you submit.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Information Collected by Cookies and Similar Technologies
          </Typography>
          <Typography color='textSecondary'>
            We, as well as Third Parties that provide content, advertising, or
            other functionality on our Services, may use cookies, pixel tags,
            local storage, and other technologies (“Technologies”) to
            automatically collect information through the Services. We use
            Technologies that are essentially small data files placed on your
            computer, tablet, mobile phone, or other devices (referred to
            collectively as a “device”) that allow us to record certain pieces
            of information whenever you visit or interact with our sites,
            services, applications, messaging, and tools, and to recognize
            you across devices.
            <ul>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Cookies.&nbsp;
                </Typography>
                Cookies are small text files placed in visitors' computer
                browsers to store their preferences. Most browsers allow you
                to block and delete cookies. However, if you do that, the
                Services may not work properly.
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Pixel Tags/Web Beacons.&nbsp;
                </Typography>
                A pixel tag (also known as a web beacon) is a piece of code
                embedded on the Site that collects information about users'
                engagement on that web page. The use of a pixel allows us to
                record, for example, that a user has visited a particular web
                page or clicked on a particular advertisement.
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Analytics.&nbsp;
                </Typography>
                We may also use Google Analytics, Google Analytics
                Demographics, Heap Analytics and Interest Reporting to collect
                information regarding visitor behavior and visitor demographics
                on some of our Services, and to develop website content. This
                analytics data is not tied to any Personal Information. For
                more information about Google Analytics, please visit&nbsp;
                <Link href='https://policies.google.com/technologies/partner-sites'>
                  https://policies.google.com/technologies/partner-sites
                </Link>. You can opt out of Google's collection and Processing
                of data generated by your use of the Services by going to&nbsp;
                <Link href='https://tools.google.com/dlpage/gaoptout'>
                  https://tools.google.com/dlpage/gaoptout
                </Link>.
              </li>
            </ul>
            Our uses of such Technologies fall into the following general
            categories:
            <ul>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Operationally Necessary.&nbsp;
                </Typography>
                We may use cookies, web beacons, or other similar technologies
                that are necessary to the operation of our sites, services,
                applications, and tools. This includes technologies that allow
                you access to our sites, services, applications, and tools;
                that are required to identify irregular site behavior, prevent
                fraudulent activity and improve security;
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Performance Related.&nbsp;
                </Typography>
                We may use cookies, web beacons, or other similar technologies
                to assess the performance of our websites, applications,
                services, and tools, including as part of our analytic
                practices to help us understand how our visitors use our
                websites, determine whether you have viewed an item or link,
                or to improve our website content, applications, services,
                or tools;
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Functionality Related.&nbsp;
                </Typography>
                We may use cookies, web beacons, or other similar technologies
                that allow us to offer you enhanced functionality when
                accessing or using our sites, services, applications, or tools.
                This may include identifying you when you sign into our sites
                or keeping track of your specified preferences, interests, or
                past items viewed so that we may enhance the presentation of
                content on our sites;
              </li>
            </ul>
            If you would like to opt out of the Technologies we employ on our
            sites, services, applications, or tools, you may do so by blocking,
            deleting, or disabling them as your browser or device permits.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Information We Collect From Other Sources
          </Typography>
          <Typography color='textSecondary'>
            We may also collect information about you from additional online
            and offline sources including commercially available third-party
            sources for the purposes of verifying your eligibility to
            participate in various programs we may offer. We may combine this
            information with the personal and other information we have
            collected about you under this Privacy Policy.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Use of Information
          </Typography>
          <Typography color='textSecondary'>
            We acquire, hold, use, and Process Personal Information for a
            variety of business purposes, including:
            <ul>
              <li>
                <Typography display='inline' color='textPrimary'>
                  To Provide Products, Services, or Information Requested:&nbsp;
                </Typography>
                We may use information about you to fulfill requests for
                Services or information, including information about potential
                or future Services, including to:
                <ul>
                  <li>Generally manage individual information and accounts;</li>
                  <li>Respond to questions, comments, and other requests;</li>
                  <li>
                    Provide access to certain areas, functionalities, and
                    features of Mochimo's Services;
                  </li>
                  <li>Allow you to register for events.</li>
                </ul>
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Administrative Purposes:&nbsp;
                </Typography>
                Mochimo may use Personal Information about you for its
                administrative purposes, including to:
                <ul>
                  <li>Verify an individual's identity;</li>
                  <li>
                    Communicate about individual accounts and activities on
                    Mochimo's Services and systems, and, in Mochimo's
                    discretion, changes to any Mochimo policy;
                  </li>
                  <li>
                    Send email to the email address you provide to us to
                    verify your account and for informational and operational
                    purposes, such as account management or system maintenance;
                  </li>
                  <li>Comply with legal and regulatory requirements;</li>
                  <li>Prevent potentially prohibited or illegal activities;</li>
                  <li>Enforce our Terms of Use.</li>
                </ul>
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Other Uses.&nbsp;
                </Typography>
                Mochimo may use Personal Information for other purposes for
                which we have a legitimate interest, such as individual or
                market research, anti-fraud protection, or any other purpose
                disclosed to you at the time you provide Personal Information
                or with your consent.
              </li>
            </ul>
            We may also use data that we collect on an aggregate or
            de-identified basis for various business purposes, where
            permissible under applicable laws and regulations.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Third-Party Sites and Social Media Platforms
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            Our Services may contain links to other websites and other
            websites may reference or link to our Services not controlled by
            us, and we do not endorse or make any representations about
            third-party websites or social media platforms. We encourage our
            users to read the privacy policies of each and every website and
            application that they interact with. We do not endorse, screen,
            or approve, and are not responsible for the privacy practices or
            content of such other websites or applications. Visiting these
            other websites or applications is at your own risk.
          </Typography>
          <Typography color='textSecondary'>
            Our Services contain links and interactive features with various
            social media platforms. If you already use these platforms, their
            cookies may be set on your device when using our Services. You
            should be aware that Personal Information which you voluntarily
            include and transmit online in a publicly accessible blog, chat
            room, social media platform, or otherwise online, or that you
            share in an open forum may be viewed and used by others without
            any restrictions. We are unable to control such uses of your
            information when interacting with a social media platform, and
            by using such services you assume the risk that the Personal
            Information provided by you may be viewed and used by third
            parties for any number of purposes.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Sharing of Information
          </Typography>
          <Typography color='textSecondary'>
            We may share information about you as follows or as otherwise
            described in this Privacy Policy:
            <ul>
              <li>
                <Typography display='inline' color='textPrimary'>
                  To verify Your Identity on our Services.&nbsp;
                </Typography>
                In order to verify your identity on our Services, we may share
                Personal Information about you. For instance, we may share
                Personal Information about you with credit reporting agencies
                to verify your Social Security number.
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  We Use Vendors and Service Providers.&nbsp;
                </Typography>
                We may share any information we receive with vendors and
                service providers. The types of service providers (processors)
                to whom we entrust Personal Information include service
                providers for: (i) provision of IT and related services; (ii)
                provision of information and Services you have requested;
                (iii) fraud prevention; and (iv) in connection with the
                provision of the Services.
              </li>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Disclosures to Protect Us or Others (e.g., As Required by
                  Law and Similar Disclosures).&nbsp;
                </Typography>
                We may access, preserve, and disclose your Personal
                Information, other account information, and content if we
                believe doing so is required or appropriate to: (i) comply
                with law enforcement or national security request and legal
                process, such as a court order or subpoena; (ii) respond to
                your requests; (iii) protect yours', ours' or others' rights,
                property, or safety; (iv) to enforce Mochimo policies or
                contracts; (v) to collect amounts owed to Mochimo; (vi) when
                we believe disclosure is necessary or appropriate to prevent
                physical harm or financial loss or in connection with an
                investigation or prosecution of suspected or actual illegal
                activity; or (vii) if we, in good faith, believe that
                disclosure is otherwise necessary or advisable.
              </li>
            </ul>
            In addition, from time to time, server logs may be reviewed for
            security purposes - e.g., to detect unauthorized activity on the
            Services. In such cases, server log data containing IP addresses
            may be shared with law enforcement bodies in order that they may
            identify users in connection with their investigation of the
            unauthorized activities.
            <ul>
              <li>
                <Typography display='inline' color='textPrimary'>
                  Merger, Sale, or Other Asset Transfers.&nbsp;
                </Typography>
                If we are involved in a merger, acquisition, financing due
                diligence, reorganization, bankruptcy, receivership, sale of
                company assets, or transition of service to another provider,
                then your information may be sold or transferred as part of
                such a transaction as permitted by law and/or contract.
              </li>
            </ul>
            We may also share aggregated or de-identified information, which
            cannot reasonably be used to identify you.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Retention
          </Typography>
          <Typography color='textSecondary'>
            Mochimo retains the Personal Information we receive for as long as
            you use our Services or as necessary to fulfill the purpose(s) for
            which it was collected, provide our Services, resolve disputes,
            establish legal defenses, conduct audits, pursue legitimate
            business purposes, enforce our agreements, and comply with
            applicable laws.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Security
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            We take our responsibility to protect the privacy and
            confidentiality of your information, including Personal
            Information, very seriously. We take reasonable measures to help
            protect information about you from loss, theft, misuse and
            unauthorized access, disclosure, alteration and destruction.
            Unfortunately, the Internet cannot be guaranteed to be 100%
            secure, and we cannot ensure or warrant the security of any
            information you provide to us. We do not accept liability for
            unintentional disclosure.
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            By using the Services or providing Personal Information to us, you
            agree that we may communicate with you electronically regarding
            security, privacy, and administrative issues relating to your use
            of the Services. If we learn of a security system's breach, we may
            attempt to notify you electronically by posting a notice on&nbsp;
            <Link href='https://mochimo.org'>mochimo.org</Link> or sending an
            e-mail to you. You may have a legal right to receive this notice
            in writing.
          </Typography>
          <Typography color='textSecondary'>
            If you have any questions about the security of your Personal
            Information, you can contact us at&nbsp;
            <Link href='mailto:support@mochimo.org'>support@mochimo.org</Link>.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Communications Preferences
          </Typography>
          <Typography color='textSecondary'>
            If you receive an unwanted email from us, you can use the
            unsubscribe link found at the bottom of the email to opt out of
            receiving future emails. We will process your request within a
            reasonable time after receipt. Note that you will continue to
            receive transaction-related emails regarding Services you have
            requested. We may also send you certain communications regarding
            Mochimo and our Services and you will not be able to opt out of
            those communications (e.g., communications regarding updates to
            our Terms of Service or this Policy).
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Sharing Preferences
          </Typography>
          <Typography color='textSecondary'>
            We may give you choices regarding the sharing of Personal
            Information with affiliates and third parties. Choices you
            have about the sharing of your Personal Information will be
            described in the privacy policies or notices you receive in
            connection with the products or Services you obtain from us.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Rights of Access, Rectification, Erasure, and Restriction
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            You may inquire as to whether Mochimo is Processing Personal
            Information about you, request access to Personal Information,
            and ask that we correct, amend, or delete your Personal
            Information where it is inaccurate. Where otherwise permitted
            by applicable law, you may send an e-mail to support@Mochimo.com
            or use any of the methods set out in this Policy to request access
            to, receive (port), restrict Processing, seek rectification, or
            request erasure of Personal Information held about you by Mochimo.
            Such requests will be processed in line with local laws.
          </Typography>
          <Typography color='textSecondary'>
            Although Mochimo makes good faith efforts to provide individuals
            with access to their Personal Information, there may be
            circumstances in which Mochimo is unable to provide access,
            including but not limited to: where the information contains
            legal privilege, would compromise others' privacy or other
            legitimate rights, where the burden or expense of providing
            access would be disproportionate to the risks to the individual's
            privacy in the case in question or where it is commercially
            proprietary. If Mochimo determines that access should be
            restricted in any particular instance, we will provide you
            with an explanation of why that determination has been made
            and a contact point for any further inquiries. To protect your
            privacy, Mochimo will take commercially reasonable steps to
            verify your identity before granting access to or making any
            changes to your Personal Information.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Cookies and Interest-Based Advertising
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            Most web browsers are set to accept cookies by default. If you
            prefer, you can usually choose to set your browser to remove or
            reject browser cookies. Please note that if you choose to remove
            or reject cookies, this could affect the availability and
            functionality of our Services.
          </Typography>
          <Typography color='textSecondary'>
            To be clear, whether you are using our opt-out or an online
            industry opt-out, these cookie-based opt-outs must be performed
            on each device and browser that you wish to have opted-out. For
            example, if you have opted-out on your computer browser, that
            opt-out will not be effective on your mobile device. You must
            separately opt out on each device. Advertisements on third-party
            websites that contain the AdChoices link and that link to this
            Privacy Policy may have been directed to you based on anonymous,
            non-Personal Information collected by advertising partners over
            time and across websites. These advertisements provide a mechanism
            to opt out of the advertising partners' use of this information
            for interest-based advertising purposes.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Privacy Policy Changes
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            We may revise this Privacy Policy in our sole discretion, so we
            encourage you to review it when you interact with us. If you
            continue to visit or use Mochimo Services made available to you
            after such changes have been made, you hereby provide your consent
            to the changes.
          </Typography>
          <Typography color='textSecondary'>
            If there are any material changes to this Policy, Mochimo will
            post any revisions to the Privacy Policy on this web page, and
            the revised version will be effective immediately when it is
            posted (or upon notice as applicable). In some cases, we may
            provide you with additional notice (such as adding a statement
            to the homepages of our Site or sending you an email notification).
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Children's Privacy
          </Typography>
          <Typography color='textSecondary'>
            We do not knowingly collect, maintain, or use Personal Information
            from children under 13 (and in certain jurisdictions under the age
            of 16) years of age, and no part of our Services are directed to
            children under the age of 13 (and in certain jurisdictions under
            the age of 16). If you learn that your child has provided us with
            Personal Information without your consent, you may alert us at
            support@Mochimo.com. If we learn that we have collected any
            Personal Information from children under 13 (and in certain
            jurisdictions under the age of 16), we will promptly take steps
            to delete such information and terminate the chil's account.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            International Users
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            By using the Services, Mochimo will transfer data to the United
            States. By choosing to visit or utilize the Services or otherwise
            provide information to us, you agree that any dispute over privacy
            or the terms contained in this Privacy Policy will be governed by
            the law of the State of Florida and the adjudication of any
            disputes arising in connection with Mochimo or the Services will
            be in accordance with the Terms of Use.
          </Typography>
          <Typography color='textSecondary'>
            If you are visiting from the European Union or other regions with
            laws governing data collection and use, please note that you are
            agreeing to the transfer of your information to the United States
            and Processing globally. By providing your Personal Information,
            you consent to any transfer and Processing in accordance with this
            Policy.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Contact Us
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            If you have questions or concerns about this Privacy Policy,
            please contact us through the information below:
          </Typography>
          <Typography color='textSecondary'>
            <Link href='mailto:support@mochimo.org'>support@mochimo.org</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export function MobileWalletPrivacy () {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} align='center'>
          <Typography variant='h2'>
            <u style={{ textDecorationColor: '#0059ff' }}>
              Mobile Wallet Privacy Policy
            </u>
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='caption' color='textSecondary'>
            Effective Date: January 1, 2026
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            No Data Collection
          </Typography>
          <Typography color='textSecondary'>
            Adequate Systems, LLC ("Adequate Systems", "we", "us", "our") does
            not collect, store, process, or transmit any personal information,
            usage data, or any other data whatsoever from users of the Mochimo
            Mobile Wallet application (the "Application").
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Wallet Data
          </Typography>
          <Typography color='textSecondary'>
            All wallet data, including but not limited to private keys, public
            keys, wallet addresses, transaction history, and account balances,
            is stored exclusively on your device. Adequate Systems has no access
            to, and does not collect, any wallet data or cryptocurrency holdings.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            No Third-Party Sharing
          </Typography>
          <Typography color='textSecondary'>
            Because we do not collect any data, we do not share, sell, rent,
            trade, or otherwise disclose any information to third parties.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            No Analytics or Tracking
          </Typography>
          <Typography color='textSecondary'>
            The Application does not incorporate any analytics services,
            advertising networks, tracking technologies, cookies, or similar
            data collection mechanisms.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Network Communications
          </Typography>
          <Typography color='textSecondary'>
            The Application may communicate with the Mochimo blockchain network
            solely for the purpose of broadcasting transactions and retrieving
            publicly available blockchain data. These communications do not
            transmit any personally identifiable information to Adequate Systems.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            User Responsibility
          </Typography>
          <Typography color='textSecondary'>
            You are solely responsible for maintaining the security and backup
            of your wallet data, including your private keys and recovery phrases.
            Adequate Systems cannot recover lost wallet data as we do not have
            access to it.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Changes to This Policy
          </Typography>
          <Typography color='textSecondary'>
            We reserve the right to modify this Privacy Policy at any time.
            Any changes will be effective immediately upon posting the updated
            policy. Your continued use of the Application constitutes acceptance
            of the revised policy.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            Contact
          </Typography>
          <Typography color='textSecondary'>
            For questions regarding this Privacy Policy, please contact:
          </Typography>
          <Typography color='textSecondary'>
            <Link href='mailto:support@mochimo.org'>support@mochimo.org</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export function MobileWalletTerms () {
  useEffect(() => scrollToTopNow(), []);
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} align='center'>
          <Typography variant='h2'>
            <u style={{ textDecorationColor: '#0059ff' }}>
              Mochimo Wallet Mobile — Terms of Service
            </u>
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography color='textSecondary'>
            <strong>Effective Date:</strong> January 3, 2026<br />
            <strong>Last Updated:</strong> January 3, 2026
          </Typography>
        </Grid>

        {/* Section 1 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            By downloading, installing, or using the Mochimo Wallet Mobile application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.
          </Typography>
          <Typography color='textSecondary'>
            These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Adequate Systems, LLC ("Adequate Systems," "we," "us," or "our").
          </Typography>
        </Grid>

        {/* Section 2 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            2. Description of Service
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Mochimo Wallet Mobile is a self-custody cryptocurrency wallet application that allows you to:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Generate and store Mochimo (MCM) wallet addresses</li>
              <li>View your MCM balance</li>
              <li>Send and receive MCM transactions</li>
              <li>Manage your private keys and recovery phrase (mnemonic)</li>
            </ul>
          </Typography>
          <Typography color='textSecondary'>
            <strong>The App is provided as a tool for interacting with the Mochimo network. We do not own the Mochimo network, control its protocol, or have any ability to reverse, modify, or cancel transactions.</strong>
          </Typography>
        </Grid>

        {/* Section 3 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            3. Self-Custody and User Responsibility
          </Typography>
          
          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            3.1 You Control Your Wallet
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Mochimo Wallet Mobile is a <strong>self-custody wallet</strong>. This means:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li><strong>You alone</strong> control your private keys and recovery phrase</li>
              <li><strong>We do not have access</strong> to your wallet, private keys, recovery phrase, or funds</li>
              <li><strong>We cannot recover</strong> your wallet if you lose your recovery phrase</li>
              <li><strong>We cannot reverse</strong> transactions once they are broadcast to the network</li>
              <li><strong>We cannot freeze, seize, or access</strong> your funds under any circumstances</li>
            </ul>
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            3.2 Recovery Phrase Security
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            When you create a wallet, you will be provided with a recovery phrase (mnemonic seed phrase). <strong>This recovery phrase is the only way to restore your wallet.</strong>
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            <strong>YOU ARE SOLELY RESPONSIBLE FOR:</strong>
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Securely recording and storing your recovery phrase</li>
              <li>Keeping your recovery phrase confidential and private</li>
              <li>Never sharing your recovery phrase with anyone</li>
              <li>Understanding that anyone with your recovery phrase can access and transfer your funds</li>
            </ul>
          </Typography>
          <Typography color='error' marginBottom={2}>
            <strong>WARNING:</strong> If you lose your recovery phrase and cannot access your device, <strong>your funds will be permanently lost</strong>. There is no recovery process, no customer support override, and no way for Adequate Systems to help you regain access.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            3.3 Device Security
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            You are responsible for:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Maintaining the security of your device</li>
              <li>Using appropriate device security measures (PIN, biometrics, encryption)</li>
              <li>Protecting your device from malware, unauthorized access, and theft</li>
              <li>Ensuring your device software is up to date</li>
            </ul>
          </Typography>
        </Grid>

        {/* Section 4 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            4. No Financial Advice
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            <strong>The App does not provide financial, investment, tax, or legal advice.</strong>
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>We make no recommendations regarding the purchase, sale, or holding of any cryptocurrency</li>
              <li>Past performance of any cryptocurrency is not indicative of future results</li>
              <li>You should consult qualified professionals before making financial decisions</li>
            </ul>
          </Typography>
        </Grid>

        {/* Section 5 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            5. Cryptocurrency Risks
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            By using this App, you acknowledge and accept the following risks:
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            5.1 Volatility
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Cryptocurrency values are highly volatile. The value of your MCM holdings may increase or decrease significantly, including to zero, at any time.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            5.2 Regulatory Uncertainty
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Cryptocurrency regulations vary by jurisdiction and may change. You are responsible for compliance with all applicable laws and regulations in your jurisdiction.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            5.3 Technology Risks
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Blockchain networks may experience congestion, forks, or technical issues</li>
              <li>Transactions may be delayed or fail</li>
              <li>Software may contain bugs or vulnerabilities</li>
              <li>The Mochimo network operates independently and may be modified by its community</li>
            </ul>
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            5.4 Irreversibility
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Blockchain transactions are irreversible. If you send MCM to an incorrect address, those funds are permanently lost.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            5.5 Loss of Access
          </Typography>
          <Typography color='textSecondary'>
            Loss of your recovery phrase, device damage, or forgotten credentials may result in permanent loss of access to your funds.
          </Typography>
        </Grid>

        {/* Section 6 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            6. Prohibited Uses
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            You agree not to use the App to:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Engage in money laundering, terrorist financing, or other illegal activities</li>
              <li>Circumvent sanctions or export controls</li>
              <li>Defraud or deceive others</li>
              <li>Interfere with the operation of the App or Mochimo network</li>
              <li>Reverse engineer, decompile, or disassemble the App except as permitted by law</li>
            </ul>
          </Typography>
        </Grid>

        {/* Section 7 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            7. Disclaimer of Warranties
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            <strong>THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            To the fullest extent permitted by law, Adequate Systems disclaims all warranties, including but not limited to:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or completeness</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security or freedom from viruses or harmful components</li>
            </ul>
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            We do not warrant that:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>The App will meet your requirements</li>
              <li>The App will be available at all times</li>
              <li>Transactions will be processed correctly or timely</li>
              <li>Any errors will be corrected</li>
            </ul>
          </Typography>
        </Grid>

        {/* Section 8 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            8. Limitation of Liability
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ADEQUATE SYSTEMS, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR:</strong>
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or funds</li>
              <li>Loss of access to your wallet or cryptocurrency</li>
              <li>Unauthorized access to your wallet or device</li>
              <li>Errors, mistakes, or inaccuracies in the App</li>
              <li>Third-party conduct or content</li>
              <li>Any matter beyond our reasonable control</li>
            </ul>
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            <strong>IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID US FOR USE OF THE APP (WHICH IS ZERO FOR FREE APPLICATIONS).</strong>
          </Typography>
          <Typography color='textSecondary'>
            This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or otherwise) and even if we have been advised of the possibility of such damages.
          </Typography>
        </Grid>

        {/* Section 9 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            9. Indemnification
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            You agree to indemnify, defend, and hold harmless Adequate Systems and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>Your use of the App</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your violation of any applicable laws or regulations</li>
            </ul>
          </Typography>
        </Grid>

        {/* Section 10 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            10. Modifications to the App and Terms
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            10.1 App Changes
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            We reserve the right to modify, suspend, or discontinue the App (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            10.2 Terms Changes
          </Typography>
          <Typography color='textSecondary'>
            We may update these Terms from time to time. The updated Terms will be effective upon posting. Your continued use of the App after any changes constitutes acceptance of the new Terms.
          </Typography>
        </Grid>

        {/* Section 11 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            11. Termination
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            You may stop using the App at any time. We may terminate or suspend your access to the App at any time, for any reason, without notice.
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Upon termination:
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ul>
              <li>These Terms remain in effect for any prior use</li>
              <li>You retain access to your cryptocurrency via your recovery phrase (independent of this App)</li>
              <li>Sections 3, 7, 8, 9, and 12 survive termination</li>
            </ul>
          </Typography>
        </Grid>

        {/* Section 12 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            12. Governing Law and Dispute Resolution
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            12.1 Governing Law
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            12.2 Dispute Resolution
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Any dispute arising out of or relating to these Terms or the App shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Hillsborough County, Florida, and the arbitrator's decision shall be final and binding.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            12.3 Class Action Waiver
          </Typography>
          <Typography color='textSecondary'>
            <strong>YOU AGREE TO RESOLVE DISPUTES WITH US ON AN INDIVIDUAL BASIS AND WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.</strong>
          </Typography>
        </Grid>

        {/* Section 13 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            13. Miscellaneous
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            13.1 Entire Agreement
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            These Terms constitute the entire agreement between you and Adequate Systems regarding the App and supersede all prior agreements.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            13.2 Severability
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            13.3 No Waiver
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision or any other provision.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            13.4 Assignment
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ fontSize: '1.1rem', marginTop: 2 }}>
            13.5 Contact
          </Typography>
          <Typography color='textSecondary' marginBottom={1.5}>
            For questions about these Terms, please contact:
          </Typography>
          <Typography color='textSecondary'>
            <strong>Adequate Systems, LLC</strong><br />
            Email: <Link href='mailto:support@mochimo.org'>support@mochimo.org</Link><br />
            Website: <Link href='https://mochimo.org'>https://mochimo.org</Link>
          </Typography>
        </Grid>

        {/* Section 14 */}
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>
            14. Acknowledgment
          </Typography>
          <Typography color='textSecondary' marginBottom={2}>
            <strong>BY USING MOCHIMO WALLET MOBILE, YOU ACKNOWLEDGE THAT:</strong>
          </Typography>
          <Typography color='textSecondary' component='div'>
            <ol>
              <li>You have read and understood these Terms of Service</li>
              <li>You understand the risks associated with cryptocurrency and self-custody wallets</li>
              <li>You are solely responsible for the security of your recovery phrase and private keys</li>
              <li>Adequate Systems cannot access, recover, or restore your wallet or funds</li>
              <li>You accept full responsibility for any loss of funds resulting from your use of the App</li>
            </ol>
          </Typography>
        </Grid>

        {/* Copyright */}
        <Grid item xs={12} align='center'>
          <Typography color='textSecondary' sx={{ fontStyle: 'italic' }}>
            © 2026 Adequate Systems, LLC. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
