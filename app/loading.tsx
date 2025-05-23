'use client';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
    <div style={{
      backgroundColor: '#7c58d3', color: '#fff',
      display: 'flex', justifyContent: 'space-between',
      padding: '60px 40px'
    }}>
      <div style={{ flex: 1 }}>
        <Skeleton count={3} width={`90%`} height={30} style={{ marginBottom: '10px' }} />
        <Skeleton width={`70%`} height={16} style={{ marginBottom: '20px' }} />
        <Skeleton width={100} height={20} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Skeleton width={300} height={200} />
      </div>
    </div>
    
    <div style={{
      display: 'flex', padding: '60px 40px', gap: '40px',
      backgroundColor: '#fff'
    }}>
      <div style={{ flex: 1 }}>
        <Skeleton width={300} height={200} />
      </div>
      <div style={{ flex: 1 }}>
        <Skeleton width={300} height={20} style={{ marginBottom: '15px' }} />
        <Skeleton count={4} width={`90%`} height={14} style={{ marginBottom: '10px' }} />
        <Skeleton width={160} height={18} style={{ marginTop: '15px' }} />
      </div>
    </div>
  </div>
);
}