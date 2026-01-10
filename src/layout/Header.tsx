import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiLock, FiUnlock, FiKey, FiClock, FiSettings, FiHome, FiInfo } from 'react-icons/fi';
import { ROUTES } from '@utils/constants';

const HeaderContainer = styled.header`
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--spacing-lg) var(--spacing-xl);
`;

const HeaderContent = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-xl);
    font-weight: var(--font-bold);
    color: var(--color-primary);
`;

const Nav = styled.nav`
    display: flex;
    gap: var(--spacing-md);
`;

const NavLink = styled(Link)<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-text-secondary)')};
    background-color: ${(props) => (props.$active ? 'rgba(99, 102, 241, 0.1)' : 'transparent')};
    transition: all var(--transition-fast);
    font-weight: ${(props) => (props.$active ? 'var(--font-medium)' : 'var(--font-normal)')};

    &:hover {
        color: var(--color-primary);
        background-color: rgba(99, 102, 241, 0.1);
    }
`;

export const Header: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <HeaderContainer>
            <HeaderContent>
                <Logo>
                    <FiLock />
                    Code Encrypter
                </Logo>

                <Nav>
                    <NavLink to={ROUTES.HOME} $active={isActive(ROUTES.HOME)}>
                        <FiHome /> Home
                    </NavLink>
                    <NavLink to={ROUTES.ENCRYPT} $active={isActive(ROUTES.ENCRYPT)}>
                        <FiLock /> Encrypt
                    </NavLink>
                    <NavLink to={ROUTES.DECRYPT} $active={isActive(ROUTES.DECRYPT)}>
                        <FiUnlock /> Decrypt
                    </NavLink>
                    <NavLink to={ROUTES.KEYS} $active={isActive(ROUTES.KEYS)}>
                        <FiKey /> Keys
                    </NavLink>
                    <NavLink to={ROUTES.HISTORY} $active={isActive(ROUTES.HISTORY)}>
                        <FiClock /> History
                    </NavLink>
                    <NavLink to={ROUTES.SETTINGS} $active={isActive(ROUTES.SETTINGS)}>
                        <FiSettings /> Settings
                    </NavLink>
                    <NavLink to={ROUTES.ABOUT} $active={isActive(ROUTES.ABOUT)}>
                        <FiInfo /> About
                    </NavLink>
                </Nav>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;