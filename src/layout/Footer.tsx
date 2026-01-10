import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-lg) var(--spacing-xl);
    margin-top: auto;
`;

const FooterContent = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--spacing-md);
`;

const Copyright = styled.p`
    color: var(--color-text-secondary);
    font-size: var(--font-sm);
    margin: 0;
`;

const Links = styled.div`
    display: flex;
    gap: var(--spacing-lg);
`;

const FooterLink = styled.a`
    color: var(--color-text-secondary);
    font-size: var(--font-sm);
    transition: color var(--transition-fast);
    cursor: pointer;

    &:hover {
        color: var(--color-primary);
    }
`;

export const Footer: React.FC = () => {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
        e.preventDefault();
        console.log(`Navigation to ${section} section`);
        // Possible uncoming updates
    };

    return (
        <FooterContainer>
            <FooterContent>
                <Copyright>
                    © {new Date().getFullYear()} Code Encrypter by Tozu
                </Copyright>
                <Links>
                    <FooterLink
                        href="/"
                        onClick={(e) => handleLinkClick(e, 'privacy')}
                        aria-label="Privacy Policy"
                    >
                        Privacy Policy
                    </FooterLink>
                    <FooterLink
                        href="/"
                        onClick={(e) => handleLinkClick(e, 'terms')}
                        aria-label="Terms of Service"
                    >
                        Terms of Service
                    </FooterLink>
                    <FooterLink
                        href="/"
                        onClick={(e) => handleLinkClick(e, 'about')}
                        aria-label="About"
                    >
                        About
                    </FooterLink>
                </Links>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;