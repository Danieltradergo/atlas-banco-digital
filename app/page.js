'use client';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Atlas Banco Digital</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>Bem-vindo ao Atlas Banco Digital</p>
      <p style={{ marginTop: '2rem', color: '#999', textAlign: 'center', maxWidth: '600px' }}>Projeto completo de um banco digital inspirado no Bank of America. Site responsivo com frontend, backend, autenticação admin, captura de leads e dashboard administrativo.</p>
    </div>
  );
}
